export type BackgroundType =
  | "color"
  //"gradient" |
  | "image"
  | "video"

export type BackgroundEffect =
  | "none"
  //"rain" |
  //"snow" |
  | "particles"
  | "lightfall"
  | "veil"
  | "plasma"

export type BackgroundTypeProps = {
  color: {
    color: string
  }
  gradient: {
    from: string
    to: string
  }
  image: {
    imageUrl: string
    blur?: string
  }
  video: {
    videoUrl: string
    speed?: number
  }
}

export type BackgroundConfig =
  | {
      type: "color"
      config: BackgroundTypeProps["color"]
    }
  //   | {
  //       type: "gradient"
  //       config: BackgroundTypeProps["gradient"]
  //     }
  | {
      type: "image"
      config: BackgroundTypeProps["image"]
    }
  | {
      type: "video"
      config: BackgroundTypeProps["video"]
    }

export type BackgroundEffectProps = {
  none: {}
  //rain: {}
  //snow: {}
  particles: {
    interactive?: boolean // default true
    speed?: number // default 100
    color?: string // hex color of particles
  }
  lightfall: {
    interactive?: boolean // default true
    speed?: number // default 100
    colors?: string[] // hex colors of lightfalls
  }
  veil: {
    speed?: number
    hueShift?: number
  }
  plasma: {
    speed?: number
    colors?: string[] // two hex colors
  }
}

export type ProfileConfig = {
  background: BackgroundConfig
  effect?: {
    type: BackgroundEffect
    config?: BackgroundEffectProps[BackgroundEffect]
  }
  card: {
    backgroundColor: string
    opacity: number
    blur?: number
    textColor: string
    borderColor: string
    borderWidth?: number
    borderRadius?: "none" | "small" | "medium" | "large" | number
    icons?: {
      iconDesign?: "color" | "monochrome" | "custom"
    }
  }
}

export type ProfileLink = {
  name: string
  url: string
  customIconUrl?: string
}

export type ProfileContent = {
  name?: string
  bio?: string
  location?: string
  profilePictureSrc?: string
  links?: ProfileLink[]
}
