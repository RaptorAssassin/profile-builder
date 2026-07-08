import { useState } from "react"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import { CheckIcon, GlobeIcon, LoaderIcon } from "lucide-react"
import { domain } from "@/lib/data"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { hasCurrentUserUsername, isUsernameTaken, updateUsername } from "@/lib/profile"
import { toast } from "sonner"
import Spinner from "../spinner"

type UsernameInputProps = {
  username: string
  onChange: (username: string) => void
  ref?: React.Ref<HTMLInputElement>
}

export default function Username({ username, onChange, ref }: UsernameInputProps) {
  const [processing, setProcessing] = useState(false)

  const router = useRouter()

  const changeUsername = async (newUsername: string) => {
    // Check if username is taken
    setProcessing(true)
    const supabase = await createClient()
    const userId = await supabase.auth
      .getUser()
      .then(({ data: { user } }) => user?.id)
      .catch(() => null)
    if (!userId) {
      router.push("/auth")
      setProcessing(false)
      return
    }
    const usernameTaken = await isUsernameTaken(newUsername)
    const userHasUsername = await hasCurrentUserUsername(userId, newUsername)

    if (userHasUsername) {
      toast.success("Username updated successfully")
      setProcessing(false)
      return
    }

    if (usernameTaken && !userHasUsername) {
      toast.error("Username is already taken")
      setProcessing(false)
      return
    }

    // If available, update username in db and update state
    try {
      const supabase = await createClient()
      await updateUsername(userId, newUsername)
      toast.success("Username updated successfully")
    } catch (error) {
      console.log("Error updating username:", error)
      toast.error("Error updating username")
    }
    setProcessing(false)
  }

  return (
    <Field>
      <FieldLabel>Username</FieldLabel>
      <div className="flex items-center gap-2">
        <InputGroup className="flex-1">
          <InputGroupAddon align="inline-start">
            <GlobeIcon />
          </InputGroupAddon>

          <InputGroupAddon>
            <InputGroupText>{domain}/</InputGroupText>
          </InputGroupAddon>

          <InputGroupInput
            className="pl-0.5!"
            placeholder="username"
            value={username}
            onChange={(e) => onChange(e.target.value)}
            ref={ref}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                changeUsername(username)
              }
            }}
          />
        </InputGroup>

        <Button onClick={() => changeUsername(username)} variant="outline" className="shrink-0">
          {processing ? <Spinner /> : <CheckIcon />}
        </Button>
      </div>
      <FieldDescription>Select a unique username.</FieldDescription>
    </Field>
  )
}
