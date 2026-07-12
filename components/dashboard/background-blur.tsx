import { Field, FieldLabel } from "../ui/field"
import { Slider } from "../ui/slider"
import { type Blur } from "@/types/profile"

type BackgroundBlurProps = {
  blur: Blur
  onChange: (blur: Blur) => void
}

export default function BackgroundBlur({ blur, onChange }: BackgroundBlurProps) {
  const blurMap: Record<number, Blur> = {
    0: "None",
    1: "Small",
    2: "Medium",
    3: "Large",
  }

  const blurReverseMap: Record<Blur, number> = {
    None: 0,
    Small: 1,
    Medium: 2,
    Large: 3,
  }

  return (
    <Field>
      <div className="flex items-center justify-between gap-2">
        <FieldLabel>Background Blur</FieldLabel>
        <FieldLabel>{blur}</FieldLabel>
      </div>
      <Slider
        value={[blurReverseMap[blur]]}
        onValueChange={([value]) => onChange(blurMap[value])}
        min={0}
        max={3}
      />
    </Field>
  )
}
