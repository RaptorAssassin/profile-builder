"use client"

import DarkVeilEffect from "@/components/dark-veil"

type LightfallProps = {
  speed?: number
  hueShift?: number
}

export default function DarkVeil({ speed = 100, hueShift = 0 }: LightfallProps) {
  return (
    <DarkVeilEffect
      hueShift={hueShift}
      noiseIntensity={0}
      scanlineIntensity={0}
      speed={(speed / 100) * 1.0}
      scanlineFrequency={0}
      warpAmount={0}
    />
  )
}
