"use client"

import { useState } from "react"
import {
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiJenkins,
  SiGithubactions,
  SiPrometheus,
  SiGrafana,
  SiAnsible,
  SiArgo,
  SiElasticsearch,
  SiSonarqubeserver,
  SiPython,
  SiGooglecloud,
} from "react-icons/si"
import { FaAws, FaMicrosoft } from "react-icons/fa"
import { GlowBorderCard } from "@/components/ui/glow-border-card"
import { cn } from "@/lib/utils"

interface SkillCategory {
  title: string
  icon: string
  skills: { name: string; icon: React.ReactNode; level: number }[]
}

const skillData: SkillCategory[] = [
  {
    title: "Cloud Platforms",
    icon: "☁️",
    skills: [
      { name: "AWS", icon: <FaAws />, level: 90 },
      { name: "GCP", icon: <SiGooglecloud />, level: 75 },
      { name: "Azure", icon: <FaMicrosoft />, level: 65 },
    ],
  },
  {
    title: "Containers & Orchestration",
    icon: "📦",
    skills: [
      { name: "Docker", icon: <SiDocker />, level: 92 },
      { name: "Kubernetes", icon: <SiKubernetes />, level: 88 },
      { name: "Helm", icon: <SiKubernetes />, level: 75 },
    ],
  },
  {
    title: "CI/CD",
    icon: "🔄",
    skills: [
      { name: "GitHub Actions", icon: <SiGithubactions />, level: 90 },
      { name: "Jenkins", icon: <SiJenkins />, level: 85 },
      { name: "ArgoCD", icon: <SiArgo />, level: 78 },
    ],
  },
  {
    title: "Infrastructure as Code",
    icon: "🏗️",
    skills: [
      { name: "Terraform", icon: <SiTerraform />, level: 88 },
      { name: "Ansible", icon: <SiAnsible />, level: 82 },
    ],
  },
  {
    title: "Monitoring & Observability",
    icon: "📊",
    skills: [
      { name: "Prometheus", icon: <SiPrometheus />, level: 85 },
      { name: "Grafana", icon: <SiGrafana />, level: 85 },
      { name: "ELK Stack", icon: <SiElasticsearch />, level: 78 },
    ],
  },
  {
    title: "Security & Languages",
    icon: "🔒",
    skills: [
      { name: "Trivy", icon: <SiSonarqubeserver />, level: 80 },
      { name: "SonarQube", icon: <SiSonarqubeserver />, level: 75 },
      { name: "Python", icon: <SiPython />, level: 85 },
    ],
  },
]

export default function Skills() {
  const [active, setActive] = useState<number>(0)

  return (
    <section id="skills" className="py-20 px-4 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-light mb-2">
          <span className="text-primary font-mono">&gt;</span> Tech Stack
        </h2>
        <p className="text-slate mb-10">Technologies I work with daily</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillData.map((cat, idx) => (
            <GlowBorderCard
              key={cat.title}
              className={cn("p-6", active === idx && "glow-border")}
              onMouseEnter={() => setActive(idx)}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="text-light font-semibold">{cat.title}</h3>
              </div>

              <div className="space-y-4">
                {cat.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2 text-sm text-slate">
                        <span className="text-primary">{skill.icon}</span>
                        <span>{skill.name}</span>
                      </div>
                      <span className="text-xs text-slate font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlowBorderCard>
          ))}
        </div>
      </div>
    </section>
  )
}
