"use client"

import { useEffect, useRef } from "react"
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from "react-icons/fi"

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let particles: { x: number; y: number; dx: number; dy: number; size: number }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "rgba(0, 245, 212, 0.6)"

      for (const p of particles) {
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.strokeStyle = `rgba(0, 245, 212, ${0.1 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleCanvas />

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <p className="text-primary font-mono text-sm md:text-lg mb-4 tracking-widest">
          Hi, my name is
        </p>
        <h1 className="text-4xl md:text-7xl font-bold text-light mb-4">
          Divyal Padalkar
        </h1>
        <h2 className="text-2xl md:text-5xl font-bold text-slate mb-6">
          DevOps &amp; SRE Engineer
        </h2>
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
            href="https://linkedin.com/in/divyal-padalkar"
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
    </section>
  )
}
