"use client"

import { useState, useEffect } from "react"
import { FiGithub, FiStar, FiGitBranch } from "react-icons/fi"
import SpotlightCard from "@/components/ui/SpotlightCard"
import { getRepos, Repo } from "@/data/repos"

const PROJECT_OVERRIDES = [
  {
    name: "AIOps Log Analyzer",
    description: "AI-powered log analysis platform using Ollama LLMs to detect anomalies, predict failures, and auto-remediate incidents in real-time.",
    tags: ["Python", "Ollama", "Kubernetes", "Prometheus", "Grafana"],
    github: "https://github.com/DivyalPadalkar/aiops-log-analyzer",
    badge: "AI + DevOps",
    badgeColor: "bg-purple-100 text-purple-700",
    matchName: "aiops-log-analyzer",
  },
  {
    name: "Chatbot UI",
    description: "Production-ready conversational AI interface with streaming responses, session management, and deployment via Docker + Kubernetes.",
    tags: ["React", "TypeScript", "Docker", "K8s", "FastAPI"],
    github: "https://github.com/DivyalPadalkar/chatbot-ui",
    badge: "Full Stack",
    badgeColor: "bg-blue-100 text-blue-700",
    matchName: "chatbot-ui",
  },
  {
    name: "Ecommerce Microservices",
    description: "Cloud-native ecommerce platform with 5+ microservices, ArgoCD GitOps deployment, service mesh, and distributed tracing on AWS EKS.",
    tags: ["Go", "Docker", "Kubernetes", "ArgoCD", "AWS EKS"],
    github: "https://github.com/DivyalPadalkar/ecommerce-microservices",
    badge: "Cloud Native",
    badgeColor: "bg-teal-100 text-teal-700",
    matchName: "ecommerce-microservices",
  },
  {
    name: "Self-Healing CI/CD Pipeline",
    description: "Intelligent pipeline that detects build failures, auto-rollbacks via ArgoCD, sends Slack alerts, and re-triggers jobs using Jenkins + Terraform.",
    tags: ["Jenkins", "Terraform", "ArgoCD", "GitHub Actions", "Ansible"],
    github: "https://github.com/DivyalPadalkar/self-healing-cicd-pipeline",
    badge: "DevSecOps",
    badgeColor: "bg-orange-100 text-orange-700",
    matchName: "self-healing-cicd-pipeline",
  },
]

interface ProjectCard {
  name: string
  description: string
  tags: string[]
  github: string
  badge: string
  badgeColor: string
  stars?: number
  forks?: number
}

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [projects, setProjects] = useState<ProjectCard[]>([])

  useEffect(() => {
    getRepos().then((data) => {
      setRepos(data)
    })
  }, [])

  useEffect(() => {
    if (repos.length === 0) {
      setProjects(PROJECT_OVERRIDES.map(p => ({
        name: p.name,
        description: p.description,
        tags: p.tags,
        github: p.github,
        badge: p.badge,
        badgeColor: p.badgeColor,
      })))
      return
    }

    const merged = PROJECT_OVERRIDES.map((override) => {
      const matched = repos.find((r) =>
        r.name.toLowerCase().includes(override.matchName.toLowerCase())
      )
      return {
        name: override.name,
        description: override.description,
        tags: override.tags,
        github: matched?.html_url || override.github,
        badge: override.badge,
        badgeColor: override.badgeColor,
        stars: matched?.stargazers_count,
        forks: matched?.forks_count,
      }
    })

    setProjects(merged)
  }, [repos])

  return (
    <section id="projects" className="py-20 px-4 bg-[#F0F7F7]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-[#1A1A1A] mb-2">
          Featured Projects
        </h2>
        <div className="w-20 h-1 bg-[#01696F] rounded mb-4" />
        <p className="text-[#6B7280] mb-10">
          Live from{" "}
          <a
            href="https://github.com/divyal27"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#01696F] hover:underline"
          >
            github.com/divyal27
          </a>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <SpotlightCard
              key={project.name}
              spotlightColor="rgba(1, 105, 111, 0.15)"
              className="p-6 flex flex-col"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-[#1A1A1A] font-display">
                  {project.name}
                </h3>
                <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${project.badgeColor}`}>
                  {project.badge}
                </span>
              </div>

              <p className="text-sm text-[#6B7280] leading-relaxed flex-1 mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-teal-50 text-[#01696F] text-[10px] rounded-full font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-auto pt-3 border-t border-black/8">
                <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                  {project.stars !== undefined && (
                    <span className="flex items-center gap-1">
                      <FiStar size={12} /> {project.stars}
                    </span>
                  )}
                  {project.forks !== undefined && (
                    <span className="flex items-center gap-1">
                      <FiGitBranch size={12} /> {project.forks}
                    </span>
                  )}
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-[#01696F] hover:text-[#0C4E54] font-medium transition-colors"
                >
                  <FiGithub size={14} /> View on GitHub
                </a>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}
