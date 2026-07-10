import ParticleBackground from "@/components/Particles"

type ParticlesProps = {
  interactive?: boolean
  speed?: number
  color?: string
}

export default function Particles({
  interactive = true,
  speed = 100,
  color = "#ffffff",
}: ParticlesProps) {
  return (
    <ParticleBackground
      particleCount={300}
      particleSpread={10}
      speed={0.1 * (speed / 100)}
      particleColors={color ? [color] : ["#ffffff"]}
      moveParticlesOnHover={interactive}
      particleHoverFactor={1}
      alphaParticles={false}
      particleBaseSize={100}
      sizeRandomness={0.5}
      cameraDistance={50}
      disableRotation
      className="h-full w-full"
    />
  )
}
