import { ProfileConfig, ProfileContent } from "@/types/profile"
import { createClient } from "@/lib/supabase/client"
import { RESERVED_USERNAMES } from "./data"

export const DEFAULT_PROFILE_CONFIG: ProfileConfig = {
  background: {
    type: "color",
    config: {
      color: "#000000",
    },
    effect: {
      type: "particles",
      config: {
        color: "#ffffff",
        speed: 100,
        interactive: true,
      },
    },
  },
  card: {
    config: {
      backgroundColor: "#000000",
      opacity: 1,
      textColor: "#ffffff",
      borderColor: "#2e2e2e",
      borderWidth: 1,
      borderRadius: 8,
      padding: 16,
    },
  },
}

export const DEFAULT_PROFILE_CONTENT: ProfileContent = {
  name: "",
  bio: "",
}

export const getProfileConfig = async (username: string): Promise<ProfileConfig> => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("profiles")
    .select("config")
    .eq("username", username)
    .single()

  if (error) throw error

  return {
    ...DEFAULT_PROFILE_CONFIG,
    ...(data?.config ?? {}),
  } as ProfileConfig
}

export const getProfileContent = async (username: string): Promise<ProfileContent> => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("profiles")
    .select("content")
    .eq("username", username)
    .single()

  if (error) throw error

  return {
    ...DEFAULT_PROFILE_CONTENT,
    ...(data?.content ?? {}),
  } as ProfileContent
}

export const updateProfileConfig = async (userId: string, config: ProfileConfig): Promise<void> => {
  const supabase = await createClient()

  const { error } = await supabase.from("profiles").update({ config }).eq("id", userId)

  if (error) throw error
}

export const updateProfileContent = async (
  userId: string,
  content: ProfileContent
): Promise<void> => {
  const supabase = await createClient()

  const { error } = await supabase.from("profiles").update({ content }).eq("id", userId)

  if (error) throw error
}

export const getUsername = async (userId: string): Promise<string> => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", userId)
    .maybeSingle()

  if (error) throw error

  return data?.username || ""
}

export const isUsernameTaken = async (username: string): Promise<boolean> => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .maybeSingle()

  if (error) throw error

  return data !== null
}

export const hasCurrentUserUsername = async (
  userId: string,
  username: string
): Promise<boolean> => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", userId)
    .eq("username", username)
    .maybeSingle()

  if (error) throw error

  return data !== null
}

export const updateUsername = async (userId: string, newUsername: string): Promise<void> => {
  const supabase = await createClient()

  newUsername = newUsername.toLowerCase()

  if (RESERVED_USERNAMES.includes(newUsername)) {
    throw new Error("This username is reserved and cannot be used.")
  }

  const { error } = await supabase
    .from("profiles")
    .update({ username: newUsername })
    .eq("id", userId)

  if (error) throw error
}

export const hasProfile = async (userId: string): Promise<boolean> => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", userId)
    .maybeSingle()

  if (error) throw error

  return data !== null
}

export const createProfile = async (userId: string): Promise<void> => {
  const supabase = await createClient()

  const { error } = await supabase.from("profiles").insert([
    {
      id: userId,
      username: `user${Math.floor(Math.random() * 1000)}`,
      config: DEFAULT_PROFILE_CONFIG,
      content: DEFAULT_PROFILE_CONTENT,
    },
  ])

  if (error) throw error
}
