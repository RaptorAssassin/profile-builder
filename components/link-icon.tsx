import { ComponentType, ReactNode } from "react"
import { MailIcon, PhoneIcon, GlobeIcon } from "lucide-react"
import {
  SiDiscord,
  SiX,
  SiYoutube,
  SiInstagram,
  SiTiktok,
  SiGithub,
  SiGitlab,
  SiLeetcode,
  SiReddit,
  SiFacebook,
  SiTwitch,
} from "@icons-pack/react-simple-icons"
import { Linkedin } from "./icons/linkedin"
import { type LinkIcon } from "@/types/profile"

export const ICON_COMPONENTS: Record<LinkIcon, ComponentType<any>> = {
  // Contact
  email: MailIcon,
  phone: PhoneIcon,
  website: GlobeIcon,

  // Social Media
  discord: SiDiscord,
  x: SiX,

  // Media Platforms
  youtube: SiYoutube,
  instagram: SiInstagram,
  tiktok: SiTiktok,

  // Dev Platforms
  github: SiGithub,
  gitlab: SiGitlab,
  leetcode: SiLeetcode,

  linkedin: Linkedin,
  reddit: SiReddit,
  facebook: SiFacebook,
  twitch: SiTwitch,
}

type LinkIconProps = {
  iconName: LinkIcon
  linkUrl?: string
  className?: string
}

export default function LinkIcon({ iconName, linkUrl, className }: LinkIconProps) {
  const IconComponent = ICON_COMPONENTS[iconName] || null

  if (!IconComponent) {
    return null
  }
  return (
    <a href={linkUrl} target="_blank" rel="noopener noreferrer">
      <IconComponent className={className || "h-6 w-6"} />
    </a>
  )
}
