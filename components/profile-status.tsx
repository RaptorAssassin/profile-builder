import { getUsername, hasProfile } from "@/lib/profile"
import { DashboardSection } from "./dashboard-section"
import { Button } from "./ui/button"
import { redirect } from "next/navigation"
import Link from "next/link"

export async function ProfileStatus() {
  const username = await getUsername()
  const profileExists = await hasProfile(username)

  if (profileExists) return null

  return (
    <DashboardSection>
        <h1>You don't have a profile yet. Create one now!</h1>
      <Button className="mt-2"><Link href="/dashboard/customize/profile">
        Create Profile
      </Link></Button>
    </DashboardSection>
  )
}