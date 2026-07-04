import ProfileBackground from "@/components/profile-background"
import ProfileCard from "@/components/profile-card"
import { getProfileConfig, getProfileContent } from "@/lib/profile"
import ClaimUsernameButtons from "@/components/claim-username-buttons"
import type { Metadata } from "next"
import { Suspense } from "react"
import FadeContent from "@/components/fade-content"

export async function generateMetadata({ params }: ProfileProps): Promise<Metadata> {
  const { username } = await params

  try {
    const content = await getProfileContent(username)

    if (!content.profilePictureSrc) {
      return {}
    }

    const favicon = `${content.profilePictureSrc}?v=${Date.now()}`

    return {
      icons: {
        icon: favicon,
        shortcut: favicon,
        apple: favicon,
      },
      title: content.name || username,
      description: `View ${content.name || username}'s profile.`,
    }
  } catch {
    return {}
  }
}

type ProfileProps = {
  params: Promise<{ username: string }>
}

export default async function Profile({ params }: ProfileProps) {
  const { username } = await params

  try {
    const [config, content] = await Promise.all([
      getProfileConfig(username),
      getProfileContent(username),
    ])

    return (
      <div className="relative h-dvh w-full">
        <Suspense>
          <FadeContent
            duration={2500}
            initialOpacity={0}
            delay={50}
            className="relative h-full w-full"
          >
            <ProfileBackground config={config} />
            <ProfileCard config={config} content={content} />
          </FadeContent>
        </Suspense>
      </div>
    )
  } catch (error) {
    console.warn("Error fetching profile data:", error)

    return (
      <div className="flex h-dvh w-full flex-col items-center justify-center gap-4 text-xl">
        This Profile doesn't exist.
        <ClaimUsernameButtons username={username} />
      </div>
    )
  }
}
