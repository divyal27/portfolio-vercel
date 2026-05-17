"use client"

import { useEffect, useRef } from "react"
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from "react-icons/fi"
import Image from "next/image"

function PipelineCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number

    interface Stage {
      x: number
      y: number
      label: string
    }

    interface Commit {
      x: number
      y: number
      progress: number
      speed: number
      stage: number
    }

    const stages: Stage[] = [
      { x: 0, y: 0, label: "Code" },
      { x: 0, y: 0, label: "Build" },
      { x: 0, y: 0, label: "Test" },
      { x: 0, y: 0, label: "Deploy" },
    ]

    const commits: Commit[] = Array.from({ length: 4 }, () => ({
      x: 0,
      y: 0,
      progress: Math.random(),
      speed: 0.002 + Math.random() * 0.003,
      stage: 0,
    }))

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
        const gradient = ctx.createLinearGradient(
          stages[i].x, stages[i].y, stages[i + 1].x, stages[i + 1].y
        )
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

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <PipelineCanvas />

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <div className="flex justify-center mb-6">
          <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-primary/30 ring-2 ring-primary/10 animate-glow">
            <Image
              src="https://avatars.githubusercontent.com/u/206107207?v=4"
              alt="Divyal Padalkar"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <p className="text-primary font-mono text-sm md:text-lg mb-3 tracking-widest">
          Hi, my name is
        </p>
        <h1 className="text-4xl md:text-7xl font-bold text-light mb-3">
          Divyal Padalkar
        </h1>
        <h2 className="text-2xl md:text-5xl font-bold text-slate mb-5">
          DevOps &amp; SRE Engineer
        </h2>

        <div className="flex justify-center gap-3 mb-4">
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-mono rounded-full border border-primary/20">
            #CI/CD
          </span>
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-mono rounded-full border border-primary/20">
            #Kubernetes
          </span>
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-mono rounded-full border border-primary/20">
            #IaC
          </span>
        </div>

        <p className="text-slate text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          Building scalable, reliable, and automated cloud systems using
          Kubernetes, Terraform, and CI/CD pipelines. Passionate about
          infrastructure as code, observability, and developer experience.
        </p>

        <div className="flex justify-center gap-4 mb-10">
          <a
            href="#projects"
            className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-all font-mono text-sm"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 bg-primary text-dark rounded-lg hover:bg-primary/90 transition-all font-mono text-sm font-semibold"
          >
            Get In Touch
          </a>
        </div>

        <div className="flex justify-center gap-6 text-slate">
          <a
            href="https://github.com/divyal27"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors text-2xl"
            aria-label="GitHub"
          >
            <FiGithub />
          </a>
          <a
            href="https://linkedin.com/in/divyal-padalkar2704"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors text-2xl"
            aria-label="LinkedIn"
          >
            <FiLinkedin />
          </a>
          <a
            href="mailto:888divyal.3@gmail.com"
            className="hover:text-primary transition-colors text-2xl"
            aria-label="Email"
          >
            <FiMail />
          </a>
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
