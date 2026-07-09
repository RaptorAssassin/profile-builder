import { Field, FieldLabel } from "../ui/field"
import { Slider } from "../ui/slider"

type CardOpacityProps = {
  opacity: number
  onChange: (opacity: number) => void
}

export default function CardOpacity({ opacity, onChange }: CardOpacityProps) {
  return (
    <Field>
      <div className="flex items-center justify-between gap-2">
        <FieldLabel>Card Opacity</FieldLabel>
        <FieldLabel>{opacity}%</FieldLabel>
      </div>
      <Slider value={[opacity]} onValueChange={([value]) => onChange(value)} min={0} max={100} />
    </Field>
  )
}
