import Color, { ColorLike } from "color"
import { Field, FieldLabel } from "../ui/field"
import { ColorPicker } from "../ui/color-picker"
import { useCallback } from "react"

type CardBackgroundColorProps = {
  backgroundColor: string
  onChange: (color: string) => void
}

export default function CardBackgroundColor({
  backgroundColor,
  onChange,
}: CardBackgroundColorProps) {
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
      <FieldLabel>Card Color</FieldLabel>
      <ColorPicker value={backgroundColor} onChange={handleBackgroundColorChange} />
    </Field>
  )
}
