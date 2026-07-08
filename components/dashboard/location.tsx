import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { MapPinIcon } from "lucide-react"

type LocationInputProps = {
  location: string | undefined
  onChange: (location: string) => void
}

export default function Location({ location, onChange }: LocationInputProps) {
  return (
    <Field>
      <FieldLabel>Location</FieldLabel>
      <InputGroup>
        <InputGroupInput
          placeholder="Location"
          value={location ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
        <InputGroupAddon align={"inline-start"}>
          <MapPinIcon />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
