"use client"

import { useEffect, useRef } from "react"
import { GlowBorderCard } from "@/components/ui/glow-border-card"

const PIPELINE_STAGES = [
  { id: 1, label: "Code", icon: "📝", status: "passed" },
  { id: 2, label: "Build", icon: "🔧", status: "passed" },
  { id: 3, label: "Test", icon: "🧪", status: "passed" },
  { id: 4, label: "Security", icon: "🔒", status: "passed" },
  { id: 5, label: "Deploy", icon: "🚀", status: "running" },
]

export default function CICDPipeline() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    let pos = 0
    const interval = setInterval(() => {
      pos = (pos + 1) % 100
      bar.style.width = `${pos}%`
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="pipeline" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-light mb-2">
          <span className="text-primary font-mono">&gt;</span> CI/CD Pipeline
        </h2>
        <p className="text-slate mb-10">Continuous Integration &amp; Deployment workflow</p>

        <GlowBorderCard className="p-6 md:p-8" mouseFollow={false}>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-3 text-xs text-slate font-mono">pipeline.yml — running</span>
          </div>

          <div className="grid grid-cols-5 gap-3 mb-8">
            {PIPELINE_STAGES.map((stage, idx) => (
              <div key={stage.id} className="text-center">
                <div
                  className={`w-full py-4 rounded-lg border text-center transition-all ${
                    stage.status === "passed"
                      ? "bg-green-500/10 border-green-500/30 text-green-400"
                      : "bg-primary/10 border-primary/30 text-primary animate-pulse"
                  }`}
                >
                  <div className="text-2xl mb-1">{stage.icon}</div>
                  <div className="text-xs font-mono">{stage.label}</div>
                </div>
                {idx < PIPELINE_STAGES.length - 1 && (
                  <div className="hidden md:block text-primary/40 text-xs mt-1">
                    ───▸
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-dark rounded-lg p-4 font-mono text-xs md:text-sm">
            <div className="text-green-400 mb-1">
              $ git push origin main
            </div>
            <div className="text-slate mb-1">
              &gt; Triggering pipeline #42 — branch: main
            </div>
            <div className="text-green-400/80 mb-1">
              ✓ Code checkout <span className="text-slate">[0.3s]</span>
            </div>
            <div className="text-green-400/80 mb-1">
              ✓ Dependencies installed <span className="text-slate">[2.1s]</span>
            </div>
            <div className="text-green-400/80 mb-1">
              ✓ Tests passed (142/142) <span className="text-slate">[4.7s]</span>
            </div>
            <div className="text-green-400/80 mb-1">
              ✓ Security scan — 0 vulnerabilities <span className="text-slate">[1.2s]</span>
            </div>

            <div className="flex items-center gap-2 text-primary">
              <span>▸ Deploying to production</span>
              <span className="relative w-32 h-4 bg-white/5 rounded overflow-hidden">
                <span
                  ref={barRef}
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-cyan-400 rounded"
                  style={{ width: "0%" }}
                />
              </span>
              <span className="text-slate animate-pulse">running...</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4 text-xs text-slate font-mono">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400" /> passed
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> running
            </span>
            <span className="text-slate/50">|</span>
            <span>duration: 8.3s</span>
            <span className="text-slate/50">|</span>
            <span className="text-green-400">status: successful</span>
          </div>
        </GlowBorderCard>
      </div>
    </section>
  )
}
