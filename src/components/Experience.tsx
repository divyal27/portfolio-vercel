"use client"

import { useState } from "react"
import { FiBriefcase, FiCalendar, FiChevronDown } from "react-icons/fi"
import { GlowBorderCard } from "@/components/ui/glow-border-card"
import { cn } from "@/lib/utils"

const experiences = [
  {
    role: "DevOps Intern",
    company: "Hisan Labs",
    period: "2024 - Present",
    description: [
      "Automated infrastructure provisioning using Ansible, reducing deployment time by 60%",
      "Reduced Mean Time to Resolution (MTTR) by 35% through improved monitoring and alerting",
      "Built CI/CD pipelines using GitHub Actions and Jenkins for automated testing and deployment",
      "Managed Kubernetes clusters for microservices deployment with zero-downtime releases",
    ],
  },
  {
    role: "Full Stack Intern",
    company: "Widesoftech",
    period: "2023 - 2024",
    description: [
      "Worked on live platform InternMeets handling real-time user interactions",
      "Developed and maintained RESTful APIs using Python and Flask",
      "Implemented database solutions and optimized query performance",
    ],
  },
]

const impactMetrics = [
  { value: "35%", label: "MTTR Reduction", desc: "Mean Time to Resolution" },
  { value: "60%", label: "Faster Deployments", desc: "via Ansible automation" },
  { value: "5+", label: "Microservices", desc: "Deployed on Kubernetes" },
  { value: "99.9%", label: "Uptime", desc: "Infrastructure reliability" },
]

export default function Experience() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-light mb-2">
          <span className="text-primary font-mono">&gt;</span> Experience
        </h2>
        <p className="text-slate mb-10">My professional journey</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {impactMetrics.map((m) => (
            <GlowBorderCard key={m.label} className="p-4 text-center" mouseFollow={false}>
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{m.value}</div>
              <div className="text-sm font-semibold text-light">{m.label}</div>
              <div className="text-xs text-slate mt-1">{m.desc}</div>
            </GlowBorderCard>
          ))}
        </div>

        <div className="space-y-4">
          {experiences.map((exp, idx) => (
            <GlowBorderCard
              key={idx}
              className="overflow-hidden transition-all duration-300"
              mouseFollow={false}
            >
              <button
                className="w-full p-5 flex items-center justify-between text-left"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                <div className="flex items-center gap-4">
                  <FiBriefcase className="text-primary shrink-0" />
                  <div>
                    <h3 className="text-light font-semibold">{exp.role}</h3>
                    <p className="text-sm text-slate">{exp.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate font-mono flex items-center gap-1">
                    <FiCalendar size={12} /> {exp.period}
                  </span>
                  <FiChevronDown
                    className={cn(
                      "text-slate transition-transform duration-300",
                      openIdx === idx && "rotate-180",
                    )}
                  />
                </div>
              </button>

              <div
                className={cn(
                  "transition-all duration-300 overflow-hidden",
                  openIdx === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                )}
              >
                <ul className="px-5 pb-5 space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-sm text-slate flex items-start gap-2">
                      <span className="text-primary mt-1">▹</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </GlowBorderCard>
          ))}
        </div>
      </div>
    </section>
  )
}
