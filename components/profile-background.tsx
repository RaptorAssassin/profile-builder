import { BACKGROUND_COMPONENTS, BACKGROUND_EFFECTS_COMPONENTS } from "@/lib/backgrounds"
import { ProfileConfig } from "@/types/profile"

type ProfileBackgroundProps = {
  config: ProfileConfig
}

export default function ProfileBackground({ config }: ProfileBackgroundProps) {
  const backgroundConfig = config.background
  const Background = BACKGROUND_COMPONENTS[backgroundConfig.type]
  const BackgroundEffect = BACKGROUND_EFFECTS_COMPONENTS[config.effect?.type || "none"]

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden select-none">
      <div className="relative h-full w-full">
        <div className="absolute inset-0">
          {backgroundConfig && Background && <Background {...backgroundConfig} />}
        </div>
        <div className="absolute inset-0">
          {BackgroundEffect && (
            <BackgroundEffect
              {...config.effect}
              //{...(config.effect?.type === "particles" ? { ref: particlesLayerRef } : {})}
            />
          )}
        </div>
      </div>
    </div>
  )
}
