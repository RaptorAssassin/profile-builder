import { ProfileConfig, ProfileContent } from "@/types/profile"
import Image from "next/image"

type ProfileCardProps = {
  config: ProfileConfig
  content: ProfileContent
}

export default function ProfileCard({ config, content }: ProfileCardProps) {
  const cardConfig = config.card.config
  const cardContent = content
  return (
    <div
      style={{
        //backgroundColor: cardConfig.backgroundColor,
        color: cardConfig.textColor,
        borderWidth: cardConfig.borderWidth,
        borderRadius: cardConfig.borderRadius,
      }}
      className="absolute top-1/2 left-1/2 w-fit max-w-[90vw] min-w-[18rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl p-6 shadow-xl sm:min-w-88 md:min-w-md lg:max-w-2/5"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: cardConfig.backgroundColor,
          opacity: cardConfig.opacity,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Profile Picture */}
        {cardContent.profilePictureSrc && (
          <Image
            src={cardContent.profilePictureSrc}
            alt="Profile Picture"
            className="h-auto w-40 rounded-full"
            width={160}
            height={160}
          />
        )}

        {/* Bio */}
        <div className="text-center">{cardContent.bio}</div>
      </div>
    </div>
  )
}
