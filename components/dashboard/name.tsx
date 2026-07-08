"use client"

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { UserIcon } from "lucide-react"

type NameInputProps = {
  name: string
  onChange: (name: string) => void
}

export default function Name({ name, onChange }: NameInputProps) {
  return (
    <Field>
      <FieldLabel>Display Name</FieldLabel>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <UserIcon />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Display name"
          value={name}
          onChange={(e) => onChange(e.target.value)}
        />
      </InputGroup>
      <FieldDescription>This will be displayed as your name on your profile.</FieldDescription>
    </Field>
  )
}
