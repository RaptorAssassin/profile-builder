export type BackgroundType = "color" | "gradient" | "image" | "video"

export type BackgroundEffect = "none" | "rain" | "snow" | "particles"

export type ProfileConfig = {
  background: {
    type: BackgroundType
    config: {
      color?: string // Color in hex
      gradient?: {
        from: string
        to: string
      }
      imageUrl?: string
      videoUrl?: string
      speed?: number
    }
    effect?: {
      type: BackgroundEffect
      config?: {
        color?: string
        speed?: number // 0-200, default 100
        interactive?: boolean // Allow hover interactivity
      }
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
  name: string
  bio?: string
  location?: string
  links?: ProfileLink[]
}
