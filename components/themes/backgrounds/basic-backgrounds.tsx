import Image from "next/image"

/**
 * Simple Color Background
 * @param color - Hex Color to render
 * @returns - The Background with the specified color
 */
export function ColorBackground({ color }: { color: string }) {
  return <div className="h-full w-full" style={{ backgroundColor: color }}></div>
}

export function GradientBackground({ gradient }: { gradient: string }) {
  return <div className="h-full w-full" style={{ background: gradient }}></div>
}

export function ImageBackground({ imageUrl }: { imageUrl: string }) {
  return (
    <Image
      className="h-full w-full"
      width={1920}
      height={1080}
      src={imageUrl}
      alt="Background Image"
    />
  )
}

export function VideoBackground({ videoUrl }: { videoUrl: string }) {
  return (
    <video className="h-full w-full object-cover" autoPlay loop muted>
      <source src={videoUrl} type="video/mp4" />
    </video>
  )
}
