export type BackgroundType = "color" | "gradient" | "image" | "video"

export type BackgroundEffect = "none" | "rain" | "snow" | "particles"

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
  | {
      type: "gradient"
      config: BackgroundTypeProps["gradient"]
    }
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
  rain: {}
  snow: {}
  particles: {
    interactive?: boolean // default true
    speed?: number // default 100
    color?: string // hex color of particles
  }
}

export type ProfileConfig = {
  background: BackgroundConfig & {
    effect?: {
      type: BackgroundEffect
      config?: BackgroundEffectProps[BackgroundEffect]
    }
  }
  card: {
    config: {
      backgroundColor: string
      opacity: number
      textColor: string
      borderColor: string
      borderWidth?: number
      borderRadius?: "none" | "small" | "medium" | "large" | number
      padding?: number
      iconDesign?: "color" | "monochrome" | "custom" // Custom is textColor for now
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
