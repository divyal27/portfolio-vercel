"use client"

import { useState, useEffect, useRef } from "react"
import { HiMenuAlt3, HiX } from "react-icons/hi"
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
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const navRef = useRef<HTMLElement>(null)

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
          ? "bg-dark/90 backdrop-blur-md shadow-lg shadow-primary/5"
          : "bg-transparent",
      )}
    >
      {scrolled && (
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, rgba(0,245,212,0.1), transparent 40%)`,
          }}
        />
      )}

      <div className="relative max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a
          href="#home"
          className="text-xl font-bold text-primary font-mono tracking-wider hover:drop-shadow-[0_0_8px_rgba(0,245,212,0.5)] transition-all duration-300"
        >
          &lt;DP /&gt;
        </a>

        <div className="hidden md:flex gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActive(link.href)}
              className={cn(
                "relative px-4 py-2 text-sm tracking-wide rounded-lg transition-all duration-300",
                active === link.href
                  ? "text-primary"
                  : "text-slate hover:text-light hover:bg-white/5",
              )}
            >
              {active === link.href && (
                <span className="absolute inset-0 bg-primary/10 rounded-lg animate-in fade-in" />
              )}
              <span className="relative z-10">{link.label}</span>
            </a>
          ))}
        </div>

        <button
          className="md:hidden text-light text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="bg-dark/95 backdrop-blur-md border-t border-white/10">
          <div className="flex flex-col items-center gap-2 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => { setOpen(false); setActive(link.href) }}
                className={cn(
                  "w-full text-center px-4 py-2 transition-colors",
                  active === link.href
                    ? "text-primary bg-primary/10"
                    : "text-slate hover:text-light",
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
