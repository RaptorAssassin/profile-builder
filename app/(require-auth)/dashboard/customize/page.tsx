"use client"
import { use, useEffect, useRef, useState, useCallback } from "react"
import Color, { type ColorLike } from "color"
import { BackgroundTypeProps, BackgroundConfig } from "@/types/profile"
import { DashboardSection } from "@/components/dashboard-section"
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
} from "@/components/ui/combobox"
import {
  DEFAULT_PROFILE_CONFIG,
  getUsername,
  getProfileConfig,
  hasProfile,
  createProfile,
  DEFAULT_PROFILE_CONTENT,
  updateProfileConfig,
  updateProfileContent,
  getProfileContent,
  updateUsername,
  isUsernameTaken,
  hasCurrentUserUsername,
} from "@/lib/profile"
import { ProfileConfig, BackgroundType, ProfileContent, BackgroundEffect } from "@/types/profile"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { CheckIcon, GlobeIcon, MapPinIcon, TextIcon, UserIcon } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { BACKGROUND_COMPONENTS, BACKGROUND_EFFECTS_COMPONENTS } from "@/lib/backgrounds"
import { ColorPicker } from "@/components/ui/color-picker"
import { DEFAULT_BACKGROUND_CONFIGS } from "@/lib/profile"
import { Input } from "@/components/ui/input"

export default function CustomizationPage({ params }: { params: { claimUsername?: string } }) {
  const [config, setConfig] = useState<ProfileConfig>(DEFAULT_PROFILE_CONFIG)
  const [content, setContent] = useState<ProfileContent>(DEFAULT_PROFILE_CONTENT)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [username, setUsername] = useState<string>("")

  const router = useRouter()

  const domain = "profile-builder.vercel.app"

  const usernameInput = useRef<HTMLInputElement>(null)

  const capitalized = (str: string | undefined) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : ""

  // Load user config on page load
  useEffect(() => {
    const getUserConfig: () => Promise<void> = async () => {
      const supabase = await createClient()
      const userId = await supabase.auth
        .getUser()
        .then(({ data: { user } }) => user?.id)
        .catch(() => null)
      if (!userId) {
        router.push("/auth")
        return
      }
      const userHasProfile = await hasProfile(userId)
      if (!userHasProfile) {
        await createProfile(userId)
        console.log("Created profile for user")
      }
      try {
        const userName = await getUsername(userId)
        const userConfig = await getProfileConfig(userName)
        const userContent = await getProfileContent(userName)
        setConfig(userConfig)
        setContent(userContent)
        setUsername(userName)
      } catch (error) {
        console.error("Error fetching user config:", error)
        router.push("/auth")
        return
      }
      if (params.claimUsername) {
        setUsername(params.claimUsername)
        usernameInput.current?.focus()
      }
      setIsLoading(false)
    }
    getUserConfig()
  }, [])

  // Save config and content to database with debounce to prevent excessive writes
  const debounceTimeout = 500 // ms
  const didInit = useRef(false)
  useEffect(() => {
    if (isLoading) return
    if (!didInit.current) {
      didInit.current = true
      return
    }

    const timeout = setTimeout(async () => {
      setIsSaving(true)
      const supabase = await createClient()
      const userId = await supabase.auth
        .getUser()
        .then(({ data: { user } }) => user?.id)
        .catch(() => null)
      if (!userId) {
        router.push("/auth")
        return
      }
      try {
        await updateProfileConfig(userId, config)
        await updateProfileContent(userId, content)
      } catch (error) {
        console.error("Error saving profile data:", error)
      } finally {
        setIsSaving(false)
        toast.success("Changes saved successfully")
      }
    }, debounceTimeout)
    return () => clearTimeout(timeout)
  }, [config, content, isLoading])

  type changeUsernameResponse = "success" | "username_taken" | "error"

  const changeUsername = async (newUsername: string) => {
    // Check if username is taken
    const supabase = await createClient()
    const userId = await supabase.auth
      .getUser()
      .then(({ data: { user } }) => user?.id)
      .catch(() => null)
    if (!userId) {
      router.push("/auth")
      return
    }
    const usernameTaken = await isUsernameTaken(newUsername)
    const userHasUsername = await hasCurrentUserUsername(userId, newUsername)

    if (userHasUsername) {
      toast.success("Username updated successfully")
      return
    }

    if (usernameTaken && !userHasUsername) {
      toast.error("Username is already taken")
      return
    }

    // If available, update username in db and update state
    try {
      const supabase = await createClient()
      const userId = await supabase.auth
        .getUser()
        .then(({ data: { user } }) => user?.id)
        .catch(() => null)
      if (!userId) {
        router.push("/auth")
        return
      }
      await updateUsername(userId, newUsername)
      toast.success("Username updated successfully")
    } catch (error) {
      toast.error("Error updating username")
    }
  }

  const handleBackgroundColorChange = useCallback((value: ColorLike) => {
    const hex = Color(value).hex()

    setConfig((prev) => {
      if (prev.background.type !== "color") return prev

      if (prev.background.config.color === hex) {
        return prev
      }

      return {
        ...prev,
        background: {
          ...prev.background,
          config: {
            ...prev.background.config,
            color: hex,
          },
        },
      }
    })
  }, [])

  const defaultConfigs = {
    color: {
      color: "#ffffff",
    },
    gradient: {
      from: "#ffffff",
      to: "#000000",
    },
    image: {
      imageUrl: "",
    },
    video: {
      videoUrl: "",
      speed: 1,
    },
  } satisfies {
    [K in BackgroundType]: BackgroundTypeProps[K]
  }

  function createBackground(type: BackgroundType): BackgroundConfig {
    switch (type) {
      case "color":
        return {
          type,
          config: { color: "#ffffff" },
        }

      case "gradient":
        return {
          type,
          config: {
            from: "#ffffff",
            to: "#000000",
          },
        }

      case "image":
        return {
          type,
          config: {
            imageUrl: "",
          },
        }

      case "video":
        return {
          type,
          config: {
            videoUrl: "",
            speed: 1,
          },
        }
    }
  }

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <h1 className="text-4xl font-extrabold">Customize Profile</h1>
      {/* Content */}
      <SectionHeading>Content</SectionHeading>
      <DashboardSection className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {/* Username */}
        <div className="">
          <Field>
            <FieldLabel>Username</FieldLabel>

            <div className="flex items-center gap-2">
              <InputGroup className="flex-1">
                <InputGroupAddon align="inline-start">
                  <GlobeIcon />
                </InputGroupAddon>

                <InputGroupAddon>
                  <InputGroupText>{domain}/</InputGroupText>
                </InputGroupAddon>

                <InputGroupInput
                  className="pl-0.5!"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  ref={usernameInput}
                />
              </InputGroup>

              <Button
                onClick={() => changeUsername(username)}
                variant="outline"
                className="shrink-0"
              >
                <CheckIcon />
              </Button>
            </div>
            <FieldDescription>Select a unique username.</FieldDescription>
          </Field>
        </div>
        {/* Display Name */}
        <div className="">
          <Field>
            <FieldLabel>Display Name</FieldLabel>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <UserIcon />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Display name"
                value={content.name}
                onChange={(e) =>
                  setContent((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </InputGroup>
            <FieldDescription>
              This will be displayed as your name on your profile.
            </FieldDescription>
          </Field>
        </div>
        {/* Bio */}
        <div className="">
          <Field>
            <FieldLabel>Bio</FieldLabel>
            <Textarea
              value={content.bio}
              onChange={(e) => setContent((prev) => ({ ...prev, bio: e.target.value }))}
              placeholder="Bio"
              className=""
            ></Textarea>
          </Field>
        </div>
        {/* Profile Picture */}
        <div className="">
          <Field>
            <FieldLabel>Profile Picture URL</FieldLabel>
            <Input
              value={content.profilePictureSrc ?? ""}
              onChange={(e) =>
                setContent((prev) => ({ ...prev, profilePictureSrc: e.target.value }))
              }
              placeholder="https://example.com/profile-picture.png"
            />
          </Field>
        </div>
        {/* Location */}
        <div className="">
          <Field>
            <FieldLabel>Location</FieldLabel>
            <InputGroup>
              <InputGroupInput
                placeholder="Location"
                value={content.location ?? ""}
                onChange={(e) => setContent((prev) => ({ ...prev, location: e.target.value }))}
              />
              <InputGroupAddon align={"inline-start"}>
                <MapPinIcon />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </div>
      </DashboardSection>
      {/* Background */}
      <SectionHeading>Background</SectionHeading>
      <DashboardSection>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Background */}
          <div className="">
            <Field>
              <FieldLabel>Background</FieldLabel>
              <Combobox
                items={Object.keys(BACKGROUND_COMPONENTS)}
                defaultValue={Object.keys(BACKGROUND_COMPONENTS)[0]}
                value={capitalized(config.background.type)}
                onInputValueChange={(value) => {
                  const type = value.toLowerCase() as BackgroundType

                  setConfig((prev) => ({
                    ...prev,
                    background: {
                      ...createBackground(type),
                      effect: prev.background.effect,
                    },
                  }))
                }}
              >
                <ComboboxInput className="capitalize" placeholder="Select a Background" />
                <ComboboxContent>
                  <ComboboxEmpty>No background found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {capitalized(item)}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>
          </div>

          {config.background.type === "color" && (
            <div className="">
              <Field>
                <FieldLabel>Background Color</FieldLabel>
                <ColorPicker
                  value={config.background.config.color}
                  onChange={handleBackgroundColorChange}
                />
              </Field>
            </div>
          )}
          {/* Background Effect */}
          <div className="">
            <Field>
              <FieldLabel>Background Effect</FieldLabel>
              <Combobox
                items={Object.keys(BACKGROUND_EFFECTS_COMPONENTS)}
                defaultValue={Object.keys(BACKGROUND_EFFECTS_COMPONENTS)[0]}
                value={capitalized(config.background.effect?.type)}
                onInputValueChange={(value) =>
                  setConfig((prev) => ({
                    ...prev,
                    background: {
                      ...prev.background,
                      effect: {
                        ...prev.background.effect,
                        type: value as BackgroundEffect,
                      },
                    },
                  }))
                }
              >
                <ComboboxInput className="capitalize" placeholder="Select a Background Effect" />
                <ComboboxContent>
                  <ComboboxEmpty>No background effect found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {capitalized(item)}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>
          </div>
        </div>
      </DashboardSection>
      {/* Card */}
      <SectionHeading>Card</SectionHeading>
      <DashboardSection>
        {/* color, opacity, border (width, color, radius), profile picture roundness, 3d bend effect, cursor glow effects */}
        <div className=""></div>
      </DashboardSection>
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h1 className="text-2xl font-bold">{children}</h1>
}
