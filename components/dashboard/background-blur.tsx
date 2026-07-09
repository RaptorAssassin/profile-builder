import { Field, FieldLabel } from "../ui/field"
import { Slider } from "../ui/slider"
import { type Blur } from "@/types/profile"

type BackgroundBlurProps = {
  blur: Blur
  onChange: (blur: Blur) => void
}

export default function BackgroundBlur({ blur, onChange }: BackgroundBlurProps) {
  const blurMap: Record<number, Blur> = {
    0: "none",
    1: "small",
    2: "medium",
    3: "large",
  }

  const blurReverseMap: Record<Blur, number> = {
    none: 0,
    small: 1,
    medium: 2,
    large: 3,
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
