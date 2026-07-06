import { ProfileConfig, ProfileContent } from "@/types/profile"
import { MapPinIcon } from "lucide-react"
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
        borderColor: cardConfig.borderColor,
        borderRadius: cardConfig.borderRadius,
      }}
      className="absolute top-1/2 left-1/2 w-fit max-w-[90vw] min-w-[18rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl p-6 shadow-[0_0_12px_rgba(255,255,255,0.05)] sm:min-w-88 md:min-w-md lg:max-w-2/5"
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
          <div className="relative h-40 w-40 overflow-hidden rounded-full">
            <Image
              src={cardContent.profilePictureSrc}
              alt="Profile Picture"
              className="object-cover object-center"
              fill
              priority
            />
          </div>
        )}

        {/* Name */}
        <div className="text-4xl text-shadow-lg">{cardContent.name}</div>

        {/* Bio */}
        <div className="text-center text-xl">{cardContent.bio}</div>

        {/* Location */}
        {cardContent.location && (
          <div className="flex flex-row gap-1">
            <MapPinIcon />
            {cardContent.location}
          </div>
        )}
      </div>
    </div>
  )
}
