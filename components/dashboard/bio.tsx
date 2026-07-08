import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

type BioInputProps = {
  bio: string
  onChange: (bio: string) => void
}

export default function Bio({ bio, onChange }: BioInputProps) {
  return (
    <Field className="flex h-full flex-1 flex-col">
      <FieldLabel>Bio</FieldLabel>
      <Textarea
        value={bio}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Bio"
        className="flex- h-full min-h-20"
      ></Textarea>
    </Field>
  )
}
