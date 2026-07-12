import { useCallback } from "react"
import Color, { ColorLike } from "color"
import { ColorPicker } from "../ui/color-picker"
import { Field, FieldLabel } from "../ui/field"

type BorderColorProps = {
  borderColor: string
  onChange: (color: string) => void
}

export default function BorderColor({ borderColor, onChange }: BorderColorProps) {
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
      <FieldLabel>Border Color</FieldLabel>
      <ColorPicker value={borderColor} onChange={handleBackgroundColorChange} />
    </Field>
  )
}
