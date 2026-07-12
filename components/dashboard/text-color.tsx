import { useCallback } from "react"
import { ColorPicker } from "../ui/color-picker"
import Color, { ColorLike } from "color"
import { Field, FieldLabel } from "../ui/field"

type TextColorProps = {
  textColor: string
  onChange: (textColor: string) => void
}

export default function TextColor({ textColor, onChange }: TextColorProps) {
  const handleBackgroundColorChange = useCallback(
    (value: ColorLike) => {
      try {
        const hex = Color(value).hex()
        onChange(hex)
      } catch (error) {
        console.error("Invalid color value:", value)
      }
    },
    [onChange]
  )

  return (
    <Field>
      <FieldLabel>Text Color</FieldLabel>
      <ColorPicker value={textColor} onChange={handleBackgroundColorChange} />
    </Field>
  )
}
