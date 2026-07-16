import { type IconDesign, type ProfileLink } from "@/types/profile"
import LinkIcon from "./link-icon"
import { cn } from "@/lib/utils"

type ProfileLinkProps = {
  links: ProfileLink[]
  iconDesign?: IconDesign
  monochromeColor?: string
}

export default function ProfileIcons({ links, iconDesign = "color" }: ProfileLinkProps) {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {links.map((link, index) => (
        <LinkIcon
          key={index}
          iconName={link.icon}
          linkUrl={link.url}
          className={cn("h-6 w-6", iconDesign === "monochrome" && "fill-current text-white")}
        />
      ))}
    </div>
  )
}
