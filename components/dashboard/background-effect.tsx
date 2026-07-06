import { type BackgroundEffect } from "@/types/profile"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox"
import { BACKGROUND_EFFECTS_COMPONENTS } from "@/lib/backgrounds"
import { capitalized } from "@/lib/utils"
import { Field, FieldLabel } from "../ui/field"

type BackgroundEffectProps = {
  effect?: BackgroundEffect
  onChange: (backgroundEffect: BackgroundEffect) => void
}

export default function BackgroundEffect({ effect, onChange }: BackgroundEffectProps) {
  return (
    <Field>
      <FieldLabel>Background Effect</FieldLabel>
      <Combobox
        items={Object.keys(BACKGROUND_EFFECTS_COMPONENTS)}
        defaultValue={Object.keys(BACKGROUND_EFFECTS_COMPONENTS)[0]}
        value={capitalized(effect) ?? ""}
        onInputValueChange={(value) => {
          if (!value) return
          onChange(value.toLowerCase() as BackgroundEffect)
        }}
      >
        <ComboboxInput />
        <ComboboxContent>
          <ComboboxEmpty>No background effect found.</ComboboxEmpty>
          <ComboboxList>
            {Object.keys(BACKGROUND_EFFECTS_COMPONENTS).map((item) => (
              <ComboboxItem key={item} value={item}>
                {capitalized(item)}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  )
}
