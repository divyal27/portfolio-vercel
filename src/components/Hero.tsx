"use client"

import { useEffect, useState } from "react"
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from "react-icons/fi"
import Image from "next/image"
import DecryptedText from "@/components/ui/DecryptedText"
import RotatingText from "@/components/ui/RotatingText"
import FloatingLines from "@/components/ui/FloatingLines"
import { cn } from "@/lib/utils"

export default function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F7F6F2] to-[#EDF6F6]"
    >
      <FloatingLines strokeColor="#01696F" numberOfLines={6} opacity={0.1} />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F7F6F2]/60 pointer-events-none z-[1]" />

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <div
          className={cn(
            "flex justify-center mb-6 transition-all duration-1000",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-[#01696F]/30 ring-2 ring-[#01696F]/10">
            <Image
              src="/images/profile.jpg"
              alt="Divyal Padalkar"
              fill
              className="object-cover rounded-full"
              priority
            />
          </div>
        </div>

        <p
          className={cn(
            "font-mono text-sm md:text-lg mb-3 tracking-widest transition-all duration-1000 delay-200",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
          style={{ color: "#01696F" }}
        >
          Hi, my name is
        </p>

        <h1
          className={cn(
            "text-4xl md:text-7xl font-bold mb-3 transition-all duration-1000 delay-400",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
          style={{ color: "#1A1A1A" }}
        >
          <DecryptedText
            text="Divyal Padalkar"
            speed={50}
            maxIterations={10}
            animateOn="view"
            className="text-[#1A1A1A]"
            encryptedClassName="text-[#01696F]"
          />
        </h1>

        <h2
          className={cn(
            "text-2xl md:text-4xl font-bold mb-5 transition-all duration-1000 delay-600",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
          style={{ color: "#1A1A1A" }}
        >
          <RotatingText
            texts={["DevOps Engineer", "SRE Engineer", "Cloud Architect", "Infrastructure Automator"]}
            mainClassName="text-[#01696F] font-bold"
            rotationInterval={3000}
            auto={true}
            splitBy="characters"
            staggerDuration={0.02}
            animatePresenceMode="wait"
          />
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
              className="px-3 py-1 bg-teal-50 text-[#01696F] text-xs font-mono rounded-full border border-teal-200"
            >
              {tag}
            </span>
          ))}
        </div>

        <p
          className={cn(
            "text-[#6B7280] text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed transition-all duration-1000 delay-800",
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
          <a
            href="#projects"
            className="px-6 py-3 bg-[#01696F] text-white rounded-lg hover:bg-[#0C4E54] transition-all font-mono text-sm font-semibold"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-[#01696F] text-[#01696F] rounded-lg hover:bg-teal-50 transition-all font-mono text-sm"
          >
            Get In Touch
          </a>
        </div>

        <div
          className={cn(
            "flex justify-center gap-6 transition-all duration-1000 delay-[1000ms]",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
          style={{ color: "#6B7280" }}
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
              className="hover:text-[#01696F] transition-all duration-300 text-2xl hover:scale-110"
              aria-label={label}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      <a
        href="#projects"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#6B7280] hover:text-[#01696F] transition-colors animate-bounce z-10"
        aria-label="Scroll down"
      >
        <FiArrowDown size={24} />
      </a>
    </section>
  )
}
