import { Rain as RainEffect } from "@/components/rain"

type RainProps = {}

export default function Rain({}: RainProps) {
  return (
    <div className="absolute h-full w-full">
      <RainEffect />
    </div>
  )
}
