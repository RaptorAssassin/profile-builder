import ParticleBackground from "@/components/particles"

type ParticlesProps = {
  interactive?: boolean // default true
  speed?: number // default 100
  color?: string // hex color of particles
}

export default function Particles({
  interactive = true,
  speed = 100,
  color = "#ffffff",
}: ParticlesProps) {
  return (
    <ParticleBackground
      particleCount={200}
      particleSpread={10}
      speed={0.1 * (speed / 100)}
      particleColors={color ? [color] : ["#ffffff"]}
      moveParticlesOnHover={interactive}
      particleHoverFactor={1}
      alphaParticles={false}
      particleBaseSize={100}
      sizeRandomness={0.5}
      cameraDistance={20}
      disableRotation
      className="h-full w-full"
    />
  )
}
