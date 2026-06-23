import ClaimUsernameButtons from "@/components/claim-username-buttons"
import { getProfileConfig, getProfileContent } from "@/lib/profile"

type UserPageProps = {
  params: Promise<{ username: string }>
}

export default async function UserPage({ params }: UserPageProps) {
  const { username } = await params
  try {
    const config = await getProfileConfig(username)
    const content = await getProfileContent(username)
    await new Promise((resolve) => setTimeout(resolve, 5000))
  } catch (error) {
    console.warn("Error fetching profile data:", error)
    return (
      <div className="flex h-dvh w-full flex-col items-center justify-center gap-4 text-xl">
        This Profile doesn't exist.
        <ClaimUsernameButtons username={username} />
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      <h1>{username}</h1>
    </div>
  )
}
