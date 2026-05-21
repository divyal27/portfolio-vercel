"use client"

import { useState, useEffect, useRef } from "react"
import { HiMenuAlt3, HiX } from "react-icons/hi"
import { FiSun, FiMoon } from "react-icons/fi"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
]

export default function SpotlightNavbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("#home")
  const [dark, setDark] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "dark") {
      setDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    if (next) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = navLinks.map((l) => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 150) {
          setActive(`#${sections[i]}`)
          break
        }
      }
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!navRef.current) return
    const rect = navRef.current.getBoundingClientRect()
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <nav
      ref={navRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b shadow-sm"
          : "bg-transparent",
        dark && scrolled && "bg-[#020C1B]/90 border-b border-white/10"
      )}
      style={{ borderColor: scrolled ? "oklch(from #1A1A1A l c h / 0.08)" : "transparent" }}
    >
      {scrolled && (
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, rgba(1,105,111,0.08), transparent 40%)`,
          }}
        />
      )}

      <div className="relative max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a
          href="#home"
          className="text-xl font-bold font-display tracking-wider transition-all duration-300"
          style={{ color: "#01696F" }}
        >
          &lt;DP /&gt;
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActive(link.href)}
              className={cn(
                "relative px-4 py-2 text-sm tracking-wide rounded-lg transition-all duration-300",
                active === link.href
                  ? "text-[#01696F]"
                  : dark
                    ? "text-[#8892B0] hover:text-[#CCD6F6] hover:bg-white/5"
                    : "text-gray-700 hover:text-[#01696F] hover:bg-teal-50",
              )}
            >
              {active === link.href && (
                <span className="absolute inset-0 bg-teal-50 rounded-lg animate-in fade-in" />
              )}
              <span className="relative z-10">{link.label}</span>
            </a>
          ))}
          <button
            onClick={toggleDark}
            className={cn(
              "ml-3 p-2 rounded-lg transition-all duration-300",
              dark ? "text-[#8892B0] hover:text-[#CCD6F6] hover:bg-white/5" : "text-gray-600 hover:text-[#01696F] hover:bg-teal-50"
            )}
            aria-label="Toggle theme"
          >
            {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleDark}
            className={cn(
              "p-2 rounded-lg transition-all",
              dark ? "text-[#8892B0]" : "text-gray-600"
            )}
            aria-label="Toggle theme"
          >
            {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          <button
            className={dark ? "text-[#CCD6F6] text-2xl" : "text-[#1A1A1A] text-2xl"}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className={dark ? "bg-[#020C1B]/95 backdrop-blur-md border-t border-white/10" : "bg-white/95 backdrop-blur-md border-t"}>
          <div className="flex flex-col items-center gap-2 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => { setOpen(false); setActive(link.href) }}
                className={cn(
                  "w-full text-center px-4 py-2 transition-colors",
                  active === link.href
                    ? "text-[#01696F] bg-teal-50"
                    : dark
                      ? "text-[#8892B0] hover:text-[#CCD6F6]"
                      : "text-gray-700 hover:text-[#01696F]",
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
