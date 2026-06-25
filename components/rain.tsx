"use html"
import React, { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface RainDrop {
  id: number
  x: number
  y: number
  length: number
  speed: number
  opacity: number
}

interface Splash {
  id: number
  x: number
  y: number
}

export function Rain() {
  const [drops, setDrops] = useState<RainDrop[]>([])
  const [splashes, setSplashes] = useState<Splash[]>([])
  const [isLightning, setIsLightning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(0)

  // Handle rain generation loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (!containerRef.current) return
      const { clientWidth } = containerRef.current

      const newDrops: RainDrop[] = Array.from({ length: 5 }).map(() => ({
        id: nextId.current++,
        x: Math.random() * clientWidth,
        y: -20,
        length: Math.random() * 20 + 15,
        speed: Math.random() * 15 + 15,
        opacity: Math.random() * 0.4 + 0.2,
      }))

      setDrops((prev) => [...prev, ...newDrops])
    }, 60)

    return () => clearInterval(interval)
  }, [])

  // Update rain drop positions and trigger splashes
  useEffect(() => {
    let animationFrameId: number

    const updatePositions = () => {
      if (!containerRef.current) return
      const { clientHeight } = containerRef.current

      setDrops((prevDrops) => {
        const remainingDrops: RainDrop[] = []
        const newSplashes: Splash[] = []

        prevDrops.forEach((drop) => {
          const nextY = drop.y + drop.speed

          if (nextY >= clientHeight - 10) {
            // Trigger splash when hitting bottom boundary
            newSplashes.push({ id: drop.id, x: drop.x, y: clientHeight - 10 })
          } else {
            remainingDrops.push({ ...drop, y: nextY })
          }
        })

        if (newSplashes.length > 0) {
          setSplashes((prev) => [...prev, ...newSplashes])
        }

        return remainingDrops
      })

      animationFrameId = requestAnimationFrame(updatePositions)
    }

    animationFrameId = requestAnimationFrame(updatePositions)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  // Clear older splashes
  useEffect(() => {
    if (splashes.length === 0) return
    const timeout = setTimeout(() => {
      setSplashes((prev) => prev.slice(5))
    }, 800)
    return () => clearTimeout(timeout)
  }, [splashes])

  // Random Lightning strike simulator
  useEffect(() => {
    const triggerLightning = () => {
      setIsLightning(true)
      setTimeout(() => setIsLightning(false), Math.random() * 150 + 50)

      // Double strike possibility
      if (Math.random() > 0.5) {
        setTimeout(() => {
          setIsLightning(true)
          setTimeout(() => setIsLightning(false), Math.random() * 100 + 30)
        }, 250)
      }
    }

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        triggerLightning()
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative h-screen w-full overflow-hidden bg-slate-950 transition-colors duration-75 ${
        isLightning ? "bg-slate-800/80" : "bg-slate-950"
      }`}
    >
      {/* Ambient Thunderstorm Glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-950" />

      {/* Rain Rendering Canvas */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full">
        <g stroke="rgba(156, 163, 175, 0.4)" strokeWidth="1" strokeLinecap="round">
          {drops.map((drop) => (
            <line
              key={drop.id}
              x1={drop.x}
              y1={drop.y}
              x2={drop.x - 2} // Slanted slightly to mimic wind
              y2={drop.y + drop.length}
              style={{ opacity: drop.opacity }}
            />
          ))}
        </g>
      </svg>

      {/* Ripple/Splashes Canvas */}
      <div className="pointer-events-none absolute inset-0">
        <AnimatePresence>
          {splashes.map((splash) => (
            <motion.div
              key={splash.id}
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute rounded-full border border-slate-400/30"
              style={{
                left: splash.x - 6,
                top: splash.y,
                width: 12,
                height: 4,
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* UI Content Layer
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-100 tracking-tight drop-shadow">
          Stormy Skies
        </h1>
        <p className="mt-4 text-md md:text-lg text-slate-400 max-w-md">
          An immersive matrix of dynamic canvas weather physics and ambient lighting.
        </p>
      </div> */}
    </div>
  )
}
