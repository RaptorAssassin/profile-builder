import { Field, FieldLabel } from "../ui/field"
import { Slider } from "../ui/slider"

type BorderWidthProps = {
  borderWidth: number
  onChange: (borderWidth: number) => void
}

export default function BorderWidth({ borderWidth, onChange }: BorderWidthProps) {
  return (
    <Field>
      <div className="flex items-center justify-between gap-2">
        <FieldLabel>Border Width</FieldLabel>
        <FieldLabel>{borderWidth !== 0 ? `${borderWidth}px` : "None"}</FieldLabel>
      </div>
      <Slider value={[borderWidth]} onValueChange={([value]) => onChange(value)} min={0} max={10} />
    </Field>
  )
}
