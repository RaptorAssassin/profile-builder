import dynamic from "next/dynamic"
import { BackgroundEffect, BackgroundType } from "@/types/profile"
import { ComponentType } from "react"

export const BACKGROUND_COMPONENTS: Record<BackgroundType, ComponentType<any>> = {
  color: dynamic(() =>
    import("../components/themes/backgrounds/basic-backgrounds").then((mod) => mod.ColorBackground)
  ),
  //   gradient: dynamic(() =>
  //     import("../components/themes/backgrounds/basic-backgrounds").then(
  //       (mod) => mod.GradientBackground
  //     )
  //   ),
  image: dynamic(() =>
    import("../components/themes/backgrounds/basic-backgrounds").then((mod) => mod.ImageBackground)
  ),
  video: dynamic(() =>
    import("../components/themes/backgrounds/basic-backgrounds").then((mod) => mod.VideoBackground)
  ),
}

export const BACKGROUND_EFFECTS_COMPONENTS: Record<BackgroundEffect, ComponentType<any> | null> = {
  none: null,
  //   rain: dynamic(() => import("../components/themes/effects/rain")),
  //   snow: dynamic(() => import("../components/themes/effects/snow")),
  particles: dynamic(() => import("../components/themes/effects/particles")),
}
