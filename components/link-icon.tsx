import { ComponentType, ReactNode, SVGProps } from "react"
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
  SiTelegram,
  SiSnapchat,
} from "react-icons/si"
import { Linkedin } from "./icons/linkedin"
import { type LinkIcon } from "@/types/profile"

export const ICON_COMPONENTS: Record<LinkIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  // Contact
  website: GlobeIcon,
  email: MailIcon,
  phone: PhoneIcon,

  // Social Media
  discord: SiDiscord,
  x: SiX,
  telegram: SiTelegram,
  
  // Media Platforms
  youtube: SiYoutube,
  instagram: SiInstagram,
  tiktok: SiTiktok,
  snapchat: SiSnapchat,

  // Dev Platforms
  github: SiGithub,
  gitlab: SiGitlab,
  leetcode: SiLeetcode,

  //  linkedin: Linkedin,
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
