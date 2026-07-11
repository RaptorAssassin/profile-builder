"use server"
import { createClient } from "@/lib/supabase/server"

export const login = async (email: string, password: string): Promise<void> => {
  const formData = new FormData()
  formData.append("email", email)
  formData.append("password", password)

  const supabase = await createClient()

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
  } catch (error) {
    console.error("Error occurred while logging in:", error)
  }
}

export const signUp = async (email: string, password: string): Promise<void> => {
  const formData = new FormData()
  formData.append("email", email)
  formData.append("password", password)

  const supabase = await createClient()

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) throw error
  } catch (error) {
    console.error("Error occurred while signing up:", error)
  }
}

export const signOut = async () => {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()
}
