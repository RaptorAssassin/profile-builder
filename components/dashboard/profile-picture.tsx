import { useRef } from "react"
import Image from "next/image"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { ImageIcon } from "lucide-react"
import { toast } from "sonner"
import { uploadImage, updateImage } from "@/lib/storage"
import { Field, FieldLabel } from "../ui/field"

type ProfilePictureProps = {
  profilePictureSrc: string | undefined
  onChange: (url: string) => void
}

export default function ProfilePicture({ profilePictureSrc, onChange }: ProfilePictureProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex gap-2">
      {profilePictureSrc && (
        <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-(--radius)">
          <Image
            src={profilePictureSrc}
            alt="Profile Picture"
            fill
            sizes="128"
            className="object-cover object-center"
          />
        </div>
      )}
      <Field className="flex-1">
        <FieldLabel>Profile Picture</FieldLabel>

        <Button onClick={() => fileInputRef.current?.click()} variant={"outline"}>
          <ImageIcon />
          Choose File
        </Button>
        <Input
          ref={fileInputRef}
          className="hidden"
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0]
            if (!file) return

            try {
              let profilePictureUrl: string

              if (profilePictureSrc) {
                profilePictureUrl = await updateImage(profilePictureSrc, file)
              } else {
                profilePictureUrl = await uploadImage(file)
              }

              onChange(profilePictureUrl)

              toast.success("Profile picture updated successfully")
              e.target.value = ""
            } catch (error) {
              console.error(error)
              toast.error("Failed to upload profile picture")
            }
          }}
        />
      </Field>
    </div>
  )
}
