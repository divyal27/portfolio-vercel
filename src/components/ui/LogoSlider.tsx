"use client"

import { FaAws } from "react-icons/fa"
import { SiDocker, SiKubernetes, SiTerraform, SiGithubactions, SiJenkins, SiArgo, SiAnsible, SiPrometheus, SiGrafana } from "react-icons/si"

const logos = [
  { icon: FaAws, label: "AWS" },
  { icon: SiDocker, label: "Docker" },
  { icon: SiKubernetes, label: "Kubernetes" },
  { icon: SiTerraform, label: "Terraform" },
  { icon: SiGithubactions, label: "GitHub Actions" },
  { icon: SiJenkins, label: "Jenkins" },
  { icon: SiArgo, label: "ArgoCD" },
  { icon: SiAnsible, label: "Ansible" },
  { icon: SiPrometheus, label: "Prometheus" },
  { icon: SiGrafana, label: "Grafana" },
]

export default function LogoSlider() {
  return (
    <section className="py-12 px-4 overflow-hidden bg-[#F0F7F7]">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-sm text-[#6B7280] font-medium mb-8 tracking-wider uppercase">
          Technologies I Work With
        </p>
        <div className="relative">
          <div className="flex gap-16 animate-marquee">
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 min-w-[100px]"
              >
                <logo.icon className="text-3xl text-[#01696F]/60 hover:text-[#01696F] transition-colors" />
                <span className="text-xs text-[#6B7280] font-medium">{logo.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
