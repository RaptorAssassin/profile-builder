import { BACKGROUND_COMPONENTS, BACKGROUND_EFFECTS_COMPONENTS } from "@/lib/backgrounds"
import { ProfileConfig } from "@/types/profile"

type ProfileBackgroundProps = {
  config: ProfileConfig
}

export default function ProfileBackground({ config }: ProfileBackgroundProps) {
  const backgroundConfig = config.background
  const Background = BACKGROUND_COMPONENTS[backgroundConfig.type]
  const BackgroundEffect = BACKGROUND_EFFECTS_COMPONENTS[backgroundConfig.effect?.type || "none"]

  //   const particlesLayerRef = useRef<HTMLDivElement>(null)

  //   const relayPointerMove = (clientX: number, clientY: number) => {
  //     const particleContainer = particlesLayerRef.current?.firstElementChild as HTMLElement | null
  //     if (!particleContainer) return

  //     particleContainer.dispatchEvent(
  //       new MouseEvent("mousemove", {
  //         bubbles: true,
  //         cancelable: true,
  //         view: window,
  //         clientX,
  //         clientY,
  //       })
  //     )
  //   }

  //   const relayPointerLeave = () => {
  //     const particleContainer = particlesLayerRef.current?.firstElementChild as HTMLElement | null
  //     if (!particleContainer) return

  //     particleContainer.dispatchEvent(
  //       new MouseEvent("mouseleave", {
  //         bubbles: true,
  //         cancelable: true,
  //         view: window,
  //       })
  //     )
  //   }

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden select-none">
      <div className="relative h-full w-full">
        <div className="absolute inset-0">
          {backgroundConfig && <Background {...backgroundConfig} />}
        </div>
        <div className="absolute inset-0">
          {BackgroundEffect && (
            <BackgroundEffect
              {...backgroundConfig.effect}
              //{...(backgroundConfig.effect?.type === "particles" ? { ref: particlesLayerRef } : {})}
            />
          )}
        </div>
      </div>
    </div>
  )
}
