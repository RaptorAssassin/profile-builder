import { DashboardSection } from "@/components/dashboard-section"
import { Button } from "@/components/ui/button"
import { getUsername, hasProfile } from "@/lib/profile"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export default async function Dashboard() {
  // Check if the user has a profile, if not redirect to the customize page
  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)
  const userId = await supabase.auth
    .getUser()
    .then(({ data: { user } }) => user?.id)
    .catch(() => null)
  if (!userId) {
    redirect("/auth")
  }
  const userhasProfile = await hasProfile(userId)
  if (!userhasProfile) {
    redirect("/dashboard/customize")
  }

  return (
    <div className="h-full w-full">
      {/* TODO: Show Analytics (e. g. profile views) in a short summary */}
      {/* When the user doesn't have a profile created, show a prompt to create one with a specific username */}
    </div>
  )
}
