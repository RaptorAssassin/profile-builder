import { getProfileContent } from "@/lib/profile"
import Image from "next/image"
import { ImageResponse } from "next/og"

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"

// Image generation
export default async function Icon({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const { profilePictureSrc } = await getProfileContent(username)
  if (!profilePictureSrc) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000",
        }}
      />
    )
  }

  return new ImageResponse(
    <div className="">
      <img src={profilePictureSrc} width={32} height={32} />
    </div>,
    {
      ...size,
    }
  )
}
