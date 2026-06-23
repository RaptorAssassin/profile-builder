"use client"
import { use, useEffect, useRef, useState } from "react"
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
} from "@/lib/profile"
import {
  BACKGROUNDS,
  ProfileConfig,
  BackgroundType,
  ProfileContent,
} from "@/types/profile"
import { createClient } from "@/lib/supabase/client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function CustomizationPage({
  params,
}: {
  params: { claimUsername?: string }
}) {
  const [config, setConfig] = useState<ProfileConfig>(DEFAULT_PROFILE_CONFIG)
  const [content, setContent] = useState<ProfileContent>(
    DEFAULT_PROFILE_CONTENT
  )
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
  useEffect(() => {
    if (isLoading) return
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
      }
    }, debounceTimeout)
    return () => clearTimeout(timeout)
  }, [config, content])

  type changeUsernameResponse = "success" | "username_taken" | "error"

  const changeUsername = async (newUsername: string) => {
    // Check if username is taken
    const usernameTaken = await isUsernameTaken(newUsername)
    if (usernameTaken) {
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

  return (
    <div className="flex h-full w-full flex-col gap-4">
      {/* Content */}
      <h1 className="font-bold text-2xl">Content</h1>
      <DashboardSection>
        {/* Username */}
        <div className="flex gap-2">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            ref={usernameInput}
          />
          <Button onClick={() => changeUsername(username)}>
            Update Username
          </Button>
        </div>
      </DashboardSection>
      {/* Visuals */}
      <h1 className="font-bold text-2xl">Visuals</h1>
      <DashboardSection>
        <div className="flex flex-row gap-4">
          {/* Background */}
          <div className="">
            <Combobox
              items={BACKGROUNDS.map((bg) => bg.type)}
              defaultValue={BACKGROUNDS[0]["type"]}
              value={config.background.type}
              onInputValueChange={(value) =>
                setConfig((prev) => ({
                  ...prev,
                  background: {
                    ...prev.background,
                    type: value as BackgroundType,
                  },
                }))
              }
            >
              <ComboboxInput placeholder="Select a Background" />
              <ComboboxContent>
                <ComboboxEmpty>No background found.</ComboboxEmpty>
                <ComboboxList>
                  {BACKGROUNDS.map((background) => (
                    <ComboboxItem key={background.name} value={background.type}>
                      {background.name}
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </div>
      </DashboardSection>
    </div>
  )
}
