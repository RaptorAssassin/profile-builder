"use client"

import { forwardRef, useMemo, useState } from "react"
import { HexColorPicker } from "react-colorful"
import { cn } from "@/lib/utils"
import { useForwardedRef } from "@/lib/use-forwarded-ref"
import { Button, buttonVariants } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { type VariantProps } from "class-variance-authority"

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }

type ColorPickerProps = {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
}

const ColorPicker = forwardRef<
  HTMLInputElement,
  Omit<ButtonProps, "value" | "onChange" | "onBlur"> & ColorPickerProps & ButtonProps
>(({ disabled, value, onChange, onBlur, name, className, size, ...props }, forwardedRef) => {
  const ref = useForwardedRef(forwardedRef)
  const [open, setOpen] = useState(false)

  const parsedValue = value || "#FFFFFF"

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger
        asChild
        disabled={disabled}
        //onBlur={onBlur}
      >
        <Button
          {...props}
          className={cn("block", className)}
          name={name}
          onClick={() => {
            setOpen(true)
          }}
          size={size}
          style={{
            backgroundColor: parsedValue,
          }}
          variant="outline"
        >
          <div />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <HexColorPicker color={parsedValue} onChange={onChange} />
        <Input
          maxLength={7}
          onChange={(e) => {
            const value = e.currentTarget.value

            if (/^#?[0-9A-Fa-f]{0,6}$/.test(value)) {
              onChange(value.startsWith("#") ? value : `#${value}`)
            }
          }}
          ref={ref}
          value={parsedValue}
          onBlur={onBlur}
        />
      </PopoverContent>
    </Popover>
  )
})
ColorPicker.displayName = "ColorPicker"

export { ColorPicker }
