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
import {
  CheckIcon,
  EditIcon,
  GlobeIcon,
  ImageIcon,
  MapPinIcon,
  SparklesIcon,
  TextIcon,
  TextSelectIcon,
  UserIcon,
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { BACKGROUND_COMPONENTS, BACKGROUND_EFFECTS_COMPONENTS } from "@/lib/backgrounds"
import { ColorPicker } from "@/components/ui/color-picker"
import { DEFAULT_BACKGROUND_CONFIGS } from "@/lib/profile"
import { Input } from "@/components/ui/input"
import { uploadImage, updateImage } from "@/lib/storage"
import Image from "next/image"
import UsernameInput from "@/components/dashboard/username"
import { capitalized } from "@/lib/utils"
import NameInput from "@/components/dashboard/name"
import Bio from "@/components/dashboard/bio"
import ProfilePicture from "@/components/dashboard/profile-picture"
import Location from "@/components/dashboard/location"

export default function CustomizationPage({ params }: { params: { claimUsername?: string } }) {
  const [config, setConfig] = useState<ProfileConfig>(DEFAULT_PROFILE_CONFIG)
  const [content, setContent] = useState<ProfileContent>(DEFAULT_PROFILE_CONTENT)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [username, setUsername] = useState<string>("")

  const router = useRouter()

  const usernameInput = useRef<HTMLInputElement>(null)

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
        //toast.success("Changes saved successfully")
      }
    }, debounceTimeout)
    return () => clearTimeout(timeout)
  }, [config, content, isLoading])

  type changeUsernameResponse = "success" | "username_taken" | "error"

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
    // gradient: {
    //   from: "#ffffff",
    //   to: "#000000",
    // },
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

      //   case "gradient":
      //     return {
      //       type,
      //       config: {
      //         from: "#ffffff",
      //         to: "#000000",
      //       },
      //     }

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

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <h1 className="flex items-center gap-2 text-4xl font-extrabold">
        <EditIcon size={32} strokeWidth={3} />
        Customize Profile
      </h1>
      {/* Content */}
      <SectionHeading>
        <TextIcon />
        Content
      </SectionHeading>
      <DashboardSection className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 xl:grid-cols-3 xl:grid-rows-2">
        <UsernameInput username={username} onChange={setUsername} ref={usernameInput} />
        <NameInput
          name={content.name ?? ""}
          onChange={(name) => setContent((prev) => ({ ...prev, name }))}
        />
        <Bio bio={content.bio ?? ""} onChange={(bio) => setContent((prev) => ({ ...prev, bio }))} />
        <ProfilePicture
          profilePictureSrc={content.profilePictureSrc}
          onChange={(profilePictureUrl) =>
            setContent((prev) => ({ ...prev, profilePictureSrc: profilePictureUrl }))
          }
        />
        <Location
          location={content.location}
          onChange={(location) => setContent((prev) => ({ ...prev, location }))}
        />
      </DashboardSection>
      {/* Background */}
      <SectionHeading>
        <SparklesIcon />
        Background
      </SectionHeading>
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

          {(config.background.type === "image" || config.background.type === "video") && (
            <div className="">
              <Field>
                <FieldLabel>Background {capitalized(config.background.type)} URL</FieldLabel>
                <Input
                  value={
                    config.background.type === "image"
                      ? config.background.config.imageUrl
                      : config.background.config.videoUrl
                  }
                  onChange={(e) => {
                    const value = e.target.value

                    setConfig((prev) => {
                      if (prev.background.type === "image") {
                        return {
                          ...prev,
                          background: {
                            ...prev.background,
                            config: {
                              ...prev.background.config,
                              imageUrl: value,
                            },
                          },
                        }
                      }

                      if (prev.background.type === "video") {
                        return {
                          ...prev,
                          background: {
                            ...prev.background,
                            config: {
                              ...prev.background.config,
                              videoUrl: value,
                            },
                          },
                        }
                      }

                      return prev
                    })
                  }}
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
      <SectionHeading>
        <TextSelectIcon />
        Card
      </SectionHeading>
      <DashboardSection>
        {/* color, opacity, border (width, color, radius), profile picture roundness, 3d bend effect, cursor glow effects */}
        <div className=""></div>
      </DashboardSection>
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h1 className="flex items-center gap-2 text-2xl font-bold">{children}</h1>
}
