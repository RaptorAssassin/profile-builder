"use client"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

export default function ClaimUsernameButtons() {
  return (
    <div className="flex flex-row gap-2">
      <Button onClick={() => redirect("/dashboard")}>Claim username</Button>
      <Button onClick={() => redirect("/dashboard")} variant={"outline"}>
        Home
      </Button>
    </div>
  )
}
