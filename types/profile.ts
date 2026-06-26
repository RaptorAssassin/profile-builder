export type BackgroundType = "color" | "gradient" | "image" | "video"

export type BackgroundEffect = "none" | "rain" | "snow" | "particles"


export type BackgroundTypeProps = {
  color: {
    color: string // Color in hex
  }
  gradient: {
    from: string
    to: string
  }
  image: {
    imageUrl: string
  }
  video: {
    videoUrl: string
    speed?: number
  }
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
  background: {
    type: BackgroundType
    config: BackgroundTypeProps[BackgroundType]
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
  links?: ProfileLink[]
}
