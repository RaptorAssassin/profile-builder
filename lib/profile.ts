import { ProfileConfig, ProfileContent } from "@/types/profile"
import { createClient } from "@/lib/supabase/server"

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
      borderColor: "#cccccc",
      borderWidth: 1,
      borderRadius: 8,
      padding: 16,
    },
  },
}

export const DEFAULT_PROFILE_CONTENT: ProfileContent = {
  name: "Example User",
  bio: "This is a sample bio.",
  location: "Example Location",
  links: [
    {
      name: "GitHub",
      url: "https://github.com/example",
      customIconUrl: "https://github.com/favicon.ico",
    },
  ],
}



export const getProfileConfig = async (
  userId: string
): Promise<ProfileConfig> => {
  // Query Profile Config Data from db
  const supabase = await createClient()
  const { data, error } = (await supabase
    .from("profiles")
    .select("config")
    .eq("id", userId)
    .single()) as {
    data: { config: Partial<ProfileConfig> } | null
    error: Error | null
  }

  if (error) throw error

  return { ...DEFAULT_PROFILE_CONFIG, ...data?.config } as ProfileConfig
}

export const getProfileContent = async (
  userId: string
): Promise<ProfileContent> => {
  // Query Profile Content Data from db
  const supabase = await createClient()
  const { data, error } = (await supabase
    .from("profiles")
    .select("content")
    .eq("id", userId)
    .single()) as {
    data: { content: Partial<ProfileContent> } | null
    error: Error | null
  }

  if (error) throw error

  return { ...DEFAULT_PROFILE_CONTENT, ...data?.content } as ProfileContent
}

export const getUsername = async (): Promise<string> => {
    const supabase = await createClient()

const {
  data: { user },
} = await supabase.auth.getUser()

const userId = user?.id

    const { data, error } = (await supabase
      .from("profiles")
      .select("username")
      .eq("id", userId)
      .maybeSingle()) as {
      data: { username: string } | null
      error: Error | null
    }
    if (error) throw error
    return data?.username || ""
}

export const hasProfile = async (userId: string): Promise<boolean> => {
    const supabase = await createClient()
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", userId)
    .maybeSingle()

  if (error) {
  console.log("user doesn't have a profile yet, displaying profile creation prompt")
  return false
}

  return data !== null
}
