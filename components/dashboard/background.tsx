import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { Field, FieldLabel } from "@/components/ui/field"
import { BACKGROUND_COMPONENTS } from "@/lib/backgrounds"
import { capitalized } from "@/lib/utils"
import { BackgroundType, BackgroundConfig } from "@/types/profile"
import { ColorPicker } from "@/components/ui/color-picker"
import Color, { ColorLike } from "color"
import { useCallback, useRef } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { ImageIcon } from "lucide-react"

type BackgroundProps = {
  background: BackgroundConfig
  onChange: (background: BackgroundConfig) => void
}

export default function Background({ background, onChange }: BackgroundProps) {
  function createBackground(type: BackgroundType): BackgroundConfig {
    switch (type) {
      case "color":
        return {
          type,
          config: { color: "#ffffff" },
        }

      //   case "gradient":
      //     return {
      //       type,
      //       config: {
      //         from: "#ffffff",
      //         to: "#000000",
      //       },
      //     }

      case "image":
        return {
          type,
          config: {
            imageUrl: "",
          },
        }

      case "video":
        return {
          type,
          config: {
            videoUrl: "",
            speed: 1,
          },
        }
    }
  }

  const handleBackgroundColorChange = useCallback((value: ColorLike) => {
    const hex = Color(value).hex()

    if (background.type !== "color") return

    if (background.config.color === hex) {
      return
    }

    onChange({
      ...background,
      config: {
        ...background.config,
        color: hex,
      },
    })
  }, [])

  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <Field>
        <FieldLabel>Background</FieldLabel>
        <Combobox
          items={Object.keys(BACKGROUND_COMPONENTS)}
          defaultValue={Object.keys(BACKGROUND_COMPONENTS)[0]}
          value={capitalized(background.type)}
          onInputValueChange={(value) => {
            const type = value.toLowerCase() as BackgroundType

            onChange(createBackground(type))
          }}
        >
          <ComboboxInput className="capitalize" placeholder="Select a Background" />
          <ComboboxContent>
            <ComboboxEmpty>No background found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item} value={item}>
                  {capitalized(item)}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>

      {background.type === "color" && (
        <div className="">
          <Field>
            <FieldLabel>Background Color</FieldLabel>
            <ColorPicker value={background.config.color} onChange={handleBackgroundColorChange} />
          </Field>
        </div>
      )}

      {(background.type === "image" || background.type === "video") && (
        <div>
          <Field>
            <FieldLabel>{capitalized(background.type)} URL</FieldLabel>
            <Button onClick={() => fileInputRef.current?.click()} variant={"outline"}>
              <ImageIcon />
              Choose File
            </Button>
            <Input
              ref={fileInputRef}
              className="hidden"
              type="file"
              accept="image/*"
              //   onChange={async (e) => {
              //     const file = e.target.files?.[0]
              //     if (!file) return

              //     try {
              //       let profilePictureUrl: string

              //       if (profilePictureSrc) {
              //         profilePictureUrl = await updateImage(profilePictureSrc, file)
              //       } else {
              //         profilePictureUrl = await uploadImage(file)
              //       }

              //       onChange(profilePictureUrl)

              //       toast.success("Profile picture updated successfully")
              //       e.target.value = ""
              //     } catch (error) {
              //       console.error(error)
              //       toast.error("Failed to upload profile picture")
              //     }
              //   }}
            />
          </Field>
        </div>
      )}
    </>
  )
}
