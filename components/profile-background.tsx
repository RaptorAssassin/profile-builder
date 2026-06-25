import { BACKGROUND_COMPONENTS, BACKGROUND_EFFECTS_COMPONENTS } from "@/lib/backgrounds"
import { BackgroundType, ProfileConfig } from "@/types/profile"

type ProfileBackgroundProps = {
  config: ProfileConfig
}

export default function ProfileBackground({ config }: ProfileBackgroundProps) {
  const backgroundConfig = config.background
  const Background = BACKGROUND_COMPONENTS[backgroundConfig.type]
  const BackgroundEffect = BACKGROUND_EFFECTS_COMPONENTS[backgroundConfig.effect?.type || "none"]

  return (
    <div className="absolute inset-0 h-full w-full">
      <Background {...backgroundConfig} />
      {BackgroundEffect && <BackgroundEffect {...backgroundConfig.effect} />}
    </div>
  )
}
