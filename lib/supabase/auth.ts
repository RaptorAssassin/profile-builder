"use server"

import { createClient } from "@/lib/supabase/server"

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const supabase = await createClient()

  await supabase.auth.signUp({
    email,
    password,
  })
}

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const supabase = await createClient()

  await supabase.auth.signInWithPassword({
    email,
    password,
  })
}

export async function signOut() {
  const supabase = await createClient()

  await supabase.auth.signOut()
}

export async function getUser() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}
