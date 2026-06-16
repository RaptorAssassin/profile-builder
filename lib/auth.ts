"use server"
import { createClient } from "@/lib/supabase/server"

export const login = async (email: string, password: string): Promise<void> => {
  const formData = new FormData()
  formData.append("email", email)
  formData.append("password", password)

  const supabase = await createClient()

  try {
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
  } catch (error) {
    console.error("Error occurred while logging in:", error)
  }
}

export const signUp = async (
  email: string,
  password: string
): Promise<void> => {
  const formData = new FormData()
  formData.append("email", email)
  formData.append("password", password)

  const supabase = await createClient()

  try {
    await supabase.auth.signUp({
      email,
      password,
    })
  } catch (error) {
    console.error("Error occurred while signing up:", error)
  }
}
