import { useEffect, useState } from "react"
import { DashboardSection } from "@/components/dashboard-section"
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
} from "@/components/ui/combobox"
import {
  DEFAULT_PROFILE_CONFIG,
  getUsername,
  getProfileConfig,
  hasProfile,
  createProfile,
} from "@/lib/profile"
import { BACKGROUNDS, ProfileConfig, BackgroundType } from "@/types/profile"
import { createClient } from "@/lib/supabase/server"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function CustomizationPage() {
  const [config, setConfig] = useState<ProfileConfig>(DEFAULT_PROFILE_CONFIG)
  const [username, setUsername] = useState<string>("")

  // Load user config on page load
  useEffect(() => {
    const getUserConfig: () => Promise<void> = async () => {
      const supabase = await createClient()
      const userId = await supabase.auth
        .getUser()
        .then(({ data: { user } }) => user?.id)
        .catch(() => null)
      if (!userId) return
      const userHasProfile = await hasProfile(userId)
      if (!userHasProfile) {
        await createProfile()
      }
      const userName = await getUsername()
      const userConfig = await getProfileConfig(userName)
      setConfig(userConfig)
      setUsername(userName)
    }
    getUserConfig()
  }, [])

  useEffect(() => {}, [config])

  const changeUsername = async (newUsername: string) => {
    // Check if username is taken
    // Display availability status
    // If available, update username in db and update state
  }

  return (
    <div className="h-full w-full">
      <DashboardSection>
        <div className="flex flex-row gap-4">
          {/* Username */}
          <div className="">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button onClick={() => changeUsername(username)}>
              Update Username
            </Button>
          </div>
          {/* Background */}
          <div className="">
            <Combobox
              items={BACKGROUNDS.map((bg) => bg.type)}
              defaultValue={BACKGROUNDS[0]["type"]}
              value={config.background.type}
              onInputValueChange={(value) =>
                setConfig((prev) => ({
                  ...prev,
                  background: {
                    ...prev.background,
                    type: value as BackgroundType,
                  },
                }))
              }
            >
              <ComboboxInput placeholder="Select a Background" />
              <ComboboxContent>
                <ComboboxEmpty>No background found.</ComboboxEmpty>
                <ComboboxList>
                  {BACKGROUNDS.map((background) => (
                    <ComboboxItem key={background.name} value={background.type}>
                      {background.name}
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </div>
      </DashboardSection>
    </div>
  )
}
