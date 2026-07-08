import { getUsername, hasProfile, isUsernameTaken } from "@/lib/profile"
import { DashboardSection } from "./dashboard-section"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export async function ProfileStatus() {
  const router = useRouter()
  try {
    const supabase = await createClient()
    const userId = await supabase.auth
      .getUser()
      .then(({ data: { user } }) => user?.id)
      .catch(() => null)
    if (!userId) {
      router.push("/auth")
      return null
    }
    const username = await getUsername(userId)
    const profileExists = await isUsernameTaken(username)
    if (profileExists) return null
  } catch (error) {
    console.error("Error fetching username:", error)
    router.push("/auth")
    return null
  }

  return (
    <DashboardSection>
      <h1>You don't have a profile yet. Create one now!</h1>
      <Button className="mt-2">
        <Link href="/dashboard/customize/profile">Create Profile</Link>
      </Button>
    </DashboardSection>
  )
}
