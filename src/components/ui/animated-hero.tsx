"use client"

import { useEffect, useRef, useState } from "react"
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from "react-icons/fi"
import Image from "next/image"
import { AnimatedButton } from "./animated-button"
import { cn } from "@/lib/utils"

function PipelineCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number

    interface Stage { x: number; y: number; label: string }
    interface Commit { x: number; y: number; progress: number; speed: number; stage: number }

    const stages: Stage[] = [
      { x: 0, y: 0, label: "Code" },
      { x: 0, y: 0, label: "Build" },
      { x: 0, y: 0, label: "Test" },
      { x: 0, y: 0, label: "Deploy" },
    ]

    const commits: Commit[] = Array.from({ length: 6 }, () => ({
      x: 0, y: 0, progress: Math.random(), speed: 0.002 + Math.random() * 0.004, stage: 0,
    }))

    const particles: { x: number; y: number; vx: number; vy: number; life: number }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const w = canvas.width
      const h = canvas.height
      const startX = w * 0.05
      const endX = w * 0.95
      const pipelineY = h * 0.15
      const stageSpacing = (endX - startX) / (stages.length - 1)

      stages.forEach((s, i) => {
        s.x = startX + i * stageSpacing
        s.y = pipelineY
      })

      for (let i = 0; i < stages.length - 1; i++) {
        const gradient = ctx.createLinearGradient(stages[i].x, stages[i].y, stages[i + 1].x, stages[i + 1].y)
        gradient.addColorStop(0, "rgba(0, 245, 212, 0.15)")
        gradient.addColorStop(0.5, "rgba(0, 245, 212, 0.4)")
        gradient.addColorStop(1, "rgba(0, 245, 212, 0.15)")

        ctx.beginPath()
        ctx.moveTo(stages[i].x, stages[i].y - 1)
        ctx.lineTo(stages[i + 1].x, stages[i + 1].y - 1)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.stroke()
      }

      stages.forEach((s) => {
        ctx.beginPath()
        ctx.arc(s.x, s.y, 5, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(0, 245, 212, 0.3)"
        ctx.fill()
        ctx.strokeStyle = "rgba(0, 245, 212, 0.6)"
        ctx.lineWidth = 1
        ctx.stroke()
      })

      commits.forEach((c) => {
        c.progress += c.speed
        if (c.progress > 1) {
          c.progress = 0
          if (Math.random() > 0.5) {
            const stage = stages[Math.floor(Math.random() * stages.length)]
            for (let i = 0; i < 3; i++) {
              particles.push({
                x: stage.x,
                y: stage.y,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2 - 1,
                life: 1,
              })
            }
          }
        }

        const totalDist = stages.length - 1
        const pos = c.progress * totalDist
        const stageIdx = Math.min(Math.floor(pos), totalDist - 1)
        const t = pos - stageIdx

        const sx = stages[stageIdx].x + (stages[stageIdx + 1]?.x - stages[stageIdx]?.x || 0) * t
        const sy = stages[stageIdx].y + (stages[stageIdx + 1]?.y - stages[stageIdx]?.y || 0) * t

        const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, 8)
        glow.addColorStop(0, "rgba(0, 245, 212, 0.8)")
        glow.addColorStop(1, "rgba(0, 245, 212, 0)")
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(sx, sy, 8, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.arc(sx, sy, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = "#00F5D4"
        ctx.fill()
      })

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.01
        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 245, 212, ${p.life * 0.6})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" />
}

export default function AnimatedHero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <PipelineCanvas />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark/60 pointer-events-none" />

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <div
          className={cn(
            "flex justify-center mb-6 transition-all duration-1000",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-primary/30 ring-2 ring-primary/10 animate-glow">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent animate-spin-slow" />
            <Image
              src="https://avatars.githubusercontent.com/u/206107207?v=4"
              alt="Divyal Padalkar"
              fill
              className="object-cover rounded-full"
              priority
            />
          </div>
        </div>

        <p
          className={cn(
            "text-primary font-mono text-sm md:text-lg mb-3 tracking-widest transition-all duration-1000 delay-200",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          Hi, my name is
        </p>

        <h1
          className={cn(
            "text-4xl md:text-7xl font-bold text-light mb-3 transition-all duration-1000 delay-400",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          Divyal{" "}
          <span className="text-gradient inline-block">Padalkar</span>
        </h1>

        <h2
          className={cn(
            "text-2xl md:text-5xl font-bold mb-5 transition-all duration-1000 delay-600",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="text-slate">DevOps</span>{" "}
          <span className="text-primary">&amp;</span>{" "}
          <span className="text-slate">SRE Engineer</span>
        </h2>

        <div
          className={cn(
            "flex justify-center gap-3 mb-4 transition-all duration-1000 delay-700",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          {["#CI/CD", "#Kubernetes", "#IaC"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-primary/10 text-primary text-xs font-mono rounded-full border border-primary/20 hover:bg-primary/20 hover:shadow-[0_0_10px_rgba(0,245,212,0.2)] transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <p
          className={cn(
            "text-slate text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed transition-all duration-1000 delay-800",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          Building scalable, reliable, and automated cloud systems using
          Kubernetes, Terraform, and CI/CD pipelines. Passionate about
          infrastructure as code, observability, and developer experience.
        </p>

        <div
          className={cn(
            "flex justify-center gap-4 mb-10 transition-all duration-1000 delay-[900ms]",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <AnimatedButton as="a" href="#projects" variant="outline" size="lg">
            View Projects
          </AnimatedButton>
          <AnimatedButton as="a" href="#contact" variant="primary" size="lg">
            Get In Touch
          </AnimatedButton>
        </div>

        <div
          className={cn(
            "flex justify-center gap-6 text-slate transition-all duration-1000 delay-[1000ms]",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          {[
            { icon: FiGithub, href: "https://github.com/divyal27", label: "GitHub" },
            { icon: FiLinkedin, href: "https://linkedin.com/in/divyal-padalkar2704", label: "LinkedIn" },
            { icon: FiMail, href: "mailto:888divyal.3@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="hover:text-primary transition-all duration-300 text-2xl hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(0,245,212,0.5)]"
              aria-label={label}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      <a
        href="#projects"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate hover:text-primary transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <FiArrowDown size={24} />
      </a>

      <div className="absolute bottom-4 left-4 text-[10px] text-slate/30 font-mono hidden md:block">
        ──[ pipeline: continuous integration ]─────────────────────────────────────
      </div>
    </section>
  )
}
