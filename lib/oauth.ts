"use client"

import { createClient } from "./supabase/client"

export const OAuthGithub = async (): Promise<void> => {
  console.log("OAuthGithub called with siteUrl:", window.location.origin)
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  if (error) {
    console.error(error)
  }
}
