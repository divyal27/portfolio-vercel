"use client"

import { useState, useEffect } from "react"
import { FiExternalLink, FiGithub, FiStar, FiGitBranch, FiSearch, FiChevronDown } from "react-icons/fi"
import { getRepos, Repo } from "@/data/repos"
import { GlowBorderCard } from "@/components/ui/glow-border-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { cn } from "@/lib/utils"

const LANG_COLORS: Record<string, string> = {
  JavaScript: "bg-yellow-400",
  TypeScript: "bg-blue-500",
  Python: "bg-green-500",
  Shell: "bg-gray-400",
  HCL: "bg-purple-500",
  HTML: "bg-orange-500",
  CSS: "bg-pink-500",
  Java: "bg-red-500",
  Go: "bg-cyan-500",
  Rust: "bg-amber-600",
}

function getLangColor(lang: string | null): string {
  return LANG_COLORS[lang || ""] || "bg-slate-500"
}

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [filter, setFilter] = useState("")
  const [selectedLang, setSelectedLang] = useState<string>("all")
  const [expanded, setExpanded] = useState<number | null>(null)

  useEffect(() => {
    getRepos().then(setRepos)
  }, [])

  const languages = Array.from(new Set(repos.map((r) => r.language).filter(Boolean))) as string[]

  const filtered = repos.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(filter.toLowerCase()) ||
      (r.description?.toLowerCase() || "").includes(filter.toLowerCase())
    const matchLang = selectedLang === "all" || r.language === selectedLang
    return matchSearch && matchLang
  })

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-light mb-2">
          <span className="text-primary font-mono">&gt;</span> Projects
        </h2>
        <p className="text-slate mb-10">
          Live from{" "}
          <a
            href="https://github.com/divyal27"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            github.com/divyal27
          </a>
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate" />
            <input
              type="text"
              placeholder="Search projects..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-light placeholder-slate focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <AnimatedButton
              as="button"
              variant={selectedLang === "all" ? "primary" : "ghost"}
              size="sm"
              onClick={() => setSelectedLang("all")}
            >
              All
            </AnimatedButton>
            {languages.map((lang) => (
              <AnimatedButton
                key={lang}
                as="button"
                variant={selectedLang === lang ? "primary" : "ghost"}
                size="sm"
                onClick={() => setSelectedLang(lang)}
              >
                {lang}
              </AnimatedButton>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((repo) => (
            <GlowBorderCard
              key={repo.id}
              className="p-5 flex flex-col cursor-pointer"
              onClick={() => window.open(repo.html_url, "_blank", "noopener noreferrer")}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={cn("w-3 h-3 rounded-full", getLangColor(repo.language))} />
                  <span className="text-xs text-slate font-mono">{repo.language || "N/A"}</span>
                </div>
                <div className="flex gap-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-slate hover:text-primary transition-colors"
                    aria-label="View source"
                  >
                    <FiGithub size={16} />
                  </a>
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-slate hover:text-primary transition-colors"
                      aria-label="View live demo"
                    >
                      <FiExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-light mb-2 font-mono group-hover:text-primary transition-colors">
                {repo.name}
              </h3>

              <p className="text-sm text-slate leading-relaxed flex-1 mb-3 line-clamp-3">
                {repo.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {repo.topics.slice(0, expanded === repo.id ? repo.topics.length : 3).map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] rounded-full font-mono"
                  >
                    {topic}
                  </span>
                ))}
                {repo.topics.length > 3 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setExpanded(expanded === repo.id ? null : repo.id)
                    }}
                    className="flex items-center gap-0.5 text-[10px] text-slate font-mono hover:text-primary transition-colors"
                  >
                    {expanded === repo.id ? "less" : `+${repo.topics.length - 3}`}
                    <FiChevronDown
                      size={10}
                      className={cn("transition-transform", expanded === repo.id && "rotate-180")}
                    />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs text-slate mt-auto pt-3 border-t border-white/5">
                <span className="flex items-center gap-1">
                  <FiStar size={12} /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <FiGitBranch size={12} /> {repo.forks_count}
                </span>
                <span className="font-mono">{repo.updated_at?.slice(0, 10)}</span>
              </div>
            </GlowBorderCard>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-slate py-10">No projects match your filter.</p>
        )}
      </div>
    </section>
  )
}
