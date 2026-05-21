"use client"

import { useState } from "react"
import { FiBriefcase, FiCalendar, FiChevronDown } from "react-icons/fi"
import { cn } from "@/lib/utils"
import AnimatedContent from "@/components/ui/AnimatedContent"
import CountUp from "@/components/ui/CountUp"
import FadeContent from "@/components/ui/FadeContent"

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
  { value: 35, suffix: "%", label: "MTTR Reduction", desc: "Mean Time to Resolution" },
  { value: 60, suffix: "%", label: "Faster Deployments", desc: "via Ansible automation" },
  { value: 5, suffix: "+", label: "Microservices", desc: "Deployed on Kubernetes" },
  { value: 99.9, suffix: "%", label: "Uptime", desc: "Infrastructure reliability" },
]

export default function Experience() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section id="experience" className="py-20 px-4 bg-[#F7F6F2]">
      <div className="max-w-6xl mx-auto">
        <FadeContent blur={true} duration={800} ease="ease-out">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#1A1A1A] mb-2">
            Experience
          </h2>
          <div className="w-20 h-1 bg-[#01696F] rounded mb-4" />
          <p className="text-[#6B7280] mb-10">My professional journey</p>
        </FadeContent>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {impactMetrics.map((m) => (
            <AnimatedContent key={m.label} direction="vertical" distance={40} delay={200}>
              <div className="card p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#01696F] mb-1">
                  <CountUp to={m.value} from={0} duration={2.5} startWhen={true} />
                  {m.suffix}
                </div>
                <div className="text-sm font-semibold text-[#1A1A1A]">{m.label}</div>
                <div className="text-xs text-[#6B7280] mt-1">{m.desc}</div>
              </div>
            </AnimatedContent>
          ))}
        </div>

        <div className="space-y-4">
          {experiences.map((exp, idx) => (
            <AnimatedContent key={idx} direction="vertical" distance={40} delay={200}>
              <div className="card overflow-hidden transition-all duration-300">
                <button
                  className="w-full p-5 flex items-center justify-between text-left"
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                >
                  <div className="flex items-center gap-4">
                    <FiBriefcase className="text-[#01696F] shrink-0" />
                    <div>
                      <h3 className="text-[#1A1A1A] font-semibold">{exp.role}</h3>
                      <p className="text-sm text-[#6B7280]">{exp.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#6B7280] font-mono flex items-center gap-1">
                      <FiCalendar size={12} /> {exp.period}
                    </span>
                    <FiChevronDown
                      className={cn(
                        "text-[#6B7280] transition-transform duration-300",
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
                      <li key={i} className="text-sm text-[#6B7280] flex items-start gap-2">
                        <span className="text-[#01696F] mt-1">▹</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  )
}
