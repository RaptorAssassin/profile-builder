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
      const hex = Color(value).hex()

      onChange(hex)
    },
    [onChange]
  )

  return (
    <Field>
      <FieldLabel>Background Color</FieldLabel>
      <ColorPicker value={backgroundColor} onChange={handleBackgroundColorChange} />
    </Field>
  )
}
