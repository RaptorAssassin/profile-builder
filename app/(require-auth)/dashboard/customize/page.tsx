"use client"

import { useEffect, useRef, useState } from "react"
import Bio from "@/components/dashboard/bio"
import Location from "@/components/dashboard/location"
import NameInput from "@/components/dashboard/name"
import ProfilePicture from "@/components/dashboard/profile-picture"
import UsernameInput from "@/components/dashboard/username"
import { DashboardSection } from "@/components/dashboard-section"
import {
  DEFAULT_PROFILE_CONFIG,
  DEFAULT_PROFILE_CONTENT,
  createProfile,
  getProfileConfig,
  getProfileContent,
  getUsername,
  hasProfile,
  updateProfileConfig,
  updateProfileContent,
} from "@/lib/profile"
import { createClient } from "@/lib/supabase/client"
import { ProfileConfig, ProfileContent } from "@/types/profile"
import { EditIcon, SparklesIcon, TextIcon, TextSelectIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import BackgroundEffectSelector from "@/components/dashboard/background-effect"
import CardBackgroundColor from "@/components/dashboard/card-background-color"
import CardOpacity from "@/components/dashboard/card-opacity"

export default function CustomizationPage({ params }: { params: { claimUsername?: string } }) {
  const [config, setConfig] = useState<ProfileConfig>(DEFAULT_PROFILE_CONFIG)
  const [content, setContent] = useState<ProfileContent>(DEFAULT_PROFILE_CONTENT)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [username, setUsername] = useState("")

  const router = useRouter()
  const usernameInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const getUserConfig = async () => {
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
  }, [params.claimUsername, router])

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
    }, 500)

    return () => clearTimeout(timeout)
  }, [config, content, isLoading, router])

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <h1 className="flex items-center gap-2 text-4xl font-extrabold">
        <EditIcon size={32} strokeWidth={3} />
        Customize Profile
      </h1>

      <SectionHeading>
        <TextIcon />
        Content
      </SectionHeading>
      <DashboardSection className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 xl:grid-cols-3 xl:grid-rows-2">
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

      <SectionHeading>
        <SparklesIcon />
        Background
      </SectionHeading>
      <DashboardSection>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* <Background
            background={config.background}
            onChange={(background) => setConfig((prev) => ({ ...prev, background }))}
          /> */}

          <BackgroundEffectSelector
            effect={config.effect?.type}
            onChange={(effect) =>
              setConfig((prev) => ({
                ...prev,
                effect: {
                  type: effect,
                  config: prev.effect?.config,
                },
              }))
            }
          />
        </div>
      </DashboardSection>

      <SectionHeading>
        <TextSelectIcon />
        Card
      </SectionHeading>
      <DashboardSection>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <CardBackgroundColor
            backgroundColor={config.card.backgroundColor}
            onChange={(backgroundColor) =>
              setConfig((prev) => ({ ...prev, card: { ...prev.card, backgroundColor } }))
            }
          />
          <CardOpacity
            opacity={config.card.opacity}
            onChange={(opacity) =>
              setConfig((prev) => ({ ...prev, card: { ...prev.card, opacity } }))
            }
          />
        </div>
      </DashboardSection>
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h1 className="flex items-center gap-2 text-2xl font-bold">{children}</h1>
}
