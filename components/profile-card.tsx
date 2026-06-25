import { ProfileConfig, ProfileContent } from "@/types/profile"

type ProfileCardProps = {
  config: ProfileConfig
  content: ProfileContent
}

export default function ProfileCard({ config, content }: ProfileCardProps) {
    const cardConfig = config.card.config
    return <div style={{backgroundColor: cardConfig.backgroundColor, color: cardConfig.textColor, borderWidth: cardConfig.borderWidth, borderRadius: cardConfig.borderRadius}}></div>
}