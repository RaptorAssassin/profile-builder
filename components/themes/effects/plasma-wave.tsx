import PlasmaWaveEffect from "@/components/plasma-wave"

type PlasmaWaveProps = {
  speed?: number // 0 - 0.2
  colors?: [string, string] // two hex colors
}

export default function PlasmaWave({ speed = 0.05, colors }: PlasmaWaveProps) {
  return (
    <PlasmaWaveEffect colors={colors || ["#A855F7", "#06B6D4"]} speed1={speed} speed2={speed} />
  )
}
