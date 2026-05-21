"use client"

import { useState } from "react"
import { SiDocker, SiKubernetes, SiTerraform, SiJenkins, SiGithubactions, SiPrometheus, SiGrafana, SiAnsible, SiArgo, SiElasticsearch, SiSonarqubeserver, SiPython, SiGooglecloud } from "react-icons/si"
import { FaMicrosoft, FaAws } from "react-icons/fa"
import { TbServerBolt } from "react-icons/tb"
import CountUp from "@/components/ui/CountUp"
import FadeContent from "@/components/ui/FadeContent"

interface SkillCategory {
  title: string
  icon: React.ReactNode
  skills: { name: string; icon: React.ReactNode; level: number }[]
}

const skillData: SkillCategory[] = [
  {
    title: "Cloud Platforms",
    icon: <FaAws />,
    skills: [
      { name: "AWS", icon: <FaAws />, level: 90 },
      { name: "GCP", icon: <SiGooglecloud />, level: 75 },
      { name: "Azure", icon: <FaMicrosoft />, level: 65 },
    ],
  },
  {
    title: "Containers & Orchestration",
    icon: <SiDocker />,
    skills: [
      { name: "Docker", icon: <SiDocker />, level: 92 },
      { name: "Kubernetes", icon: <SiKubernetes />, level: 88 },
      { name: "Helm", icon: <TbServerBolt />, level: 75 },
    ],
  },
  {
    title: "CI/CD",
    icon: <SiGithubactions />,
    skills: [
      { name: "GitHub Actions", icon: <SiGithubactions />, level: 90 },
      { name: "Jenkins", icon: <SiJenkins />, level: 85 },
      { name: "ArgoCD", icon: <SiArgo />, level: 78 },
    ],
  },
  {
    title: "Infrastructure as Code",
    icon: <SiTerraform />,
    skills: [
      { name: "Terraform", icon: <SiTerraform />, level: 88 },
      { name: "Ansible", icon: <SiAnsible />, level: 82 },
    ],
  },
  {
    title: "Monitoring & Observability",
    icon: <SiPrometheus />,
    skills: [
      { name: "Prometheus", icon: <SiPrometheus />, level: 85 },
      { name: "Grafana", icon: <SiGrafana />, level: 85 },
      { name: "ELK Stack", icon: <SiElasticsearch />, level: 78 },
    ],
  },
  {
    title: "Security & Languages",
    icon: <SiPython />,
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
    <section id="skills" className="py-20 px-4 bg-[#F7F6F2]">
      <div className="max-w-6xl mx-auto">
        <FadeContent blur={true} duration={800} ease="ease-out">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#1A1A1A] mb-2">
            Tech Stack
          </h2>
          <div className="w-20 h-1 bg-[#01696F] rounded mb-4" />
          <p className="text-[#6B7280] mb-10">Technologies I work with daily</p>
        </FadeContent>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillData.map((cat, idx) => (
            <FadeContent key={cat.title} blur={true} duration={800} ease="ease-out" delay={idx * 100}>
              <div
                className="card p-6"
                onMouseEnter={() => setActive(idx)}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl text-[#01696F]">{cat.icon}</span>
                  <h3 className="text-[#1A1A1A] font-display font-semibold">{cat.title}</h3>
                </div>

                <div className="space-y-4">
                  {cat.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                          <span className="text-[#01696F]">{skill.icon}</span>
                          <span>{skill.name}</span>
                        </div>
                        <span className="text-xs text-[#6B7280] font-mono">
                          <CountUp to={skill.level} from={0} duration={2} startWhen={true} />
                          %
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#01696F] rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  )
}
