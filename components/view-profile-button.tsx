import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getUsername } from "@/lib/profile"
import { createClient } from "@/lib/supabase/client"
import { Suspense } from "react"

export async function ViewProfileButton() {
  const supabase = await createClient()
  const userId = await supabase.auth
    .getUser()
    .then(({ data: { user } }) => user?.id)
    .catch(() => null)
  if (!userId) {
    return
  }
  const username = await getUsername(userId)
  return (
    <Suspense fallback={<Button disabled>View Profile</Button>}>
      <Button onClick={() => redirect(`/${username}`)}>View Profile</Button>
    </Suspense>
  )
}
