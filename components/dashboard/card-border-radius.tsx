import { Field, FieldLabel } from "../ui/field"
import { Slider } from "../ui/slider"
import { type BorderRadius } from "@/types/profile"

type CardBorderRadiusProps = {
  borderRadius: BorderRadius
  onChange: (borderRadius: BorderRadius) => void
}

export default function CardBorderRadius({ borderRadius, onChange }: CardBorderRadiusProps) {
  const borderRadiusMap: Record<number, BorderRadius> = {
    0: "none",
    1: "small",
    2: "medium",
    3: "large",
  }

  const borderRadiusReverseMap: Record<BorderRadius, number> = {
    none: 0,
    small: 1,
    medium: 2,
    large: 3,
  }

  return (
    <Field>
      <div className="flex items-center justify-between gap-2">
        <FieldLabel>Border Radius</FieldLabel>
        <FieldLabel>{borderRadius}</FieldLabel>
      </div>
      <Slider
        value={[borderRadiusReverseMap[borderRadius]]}
        onValueChange={([value]) => onChange(borderRadiusMap[value])}
        min={0}
        max={3}
      />
    </Field>
  )
}
