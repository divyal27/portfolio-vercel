"use client"

import { useRef, useState, type ReactNode, type MouseEventHandler } from "react"
import { cn } from "@/lib/utils"

interface GlowBorderCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  onMouseEnter?: MouseEventHandler
  as?: "div" | "button"
  mouseFollow?: boolean
}

export function GlowBorderCard({
  children,
  className,
  onClick,
  onMouseEnter,
  as: Component = "div",
  mouseFollow = true,
}: GlowBorderCardProps) {
  const cardRef = useRef<HTMLElement>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mouseFollow || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const Tag = Component

  return (
    <Tag
      ref={cardRef as any}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={(e: React.MouseEvent) => { setHover(true); onMouseEnter?.(e) }}
      onMouseLeave={() => setHover(false)}
      className={cn(
        "relative overflow-hidden",
        "bg-white/5 backdrop-blur-md border border-white/10 rounded-xl",
        "hover:border-primary/30 transition-all duration-300",
        "group",
        className,
      )}
    >
      {hover && mouseFollow && (
        <div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(300px circle at ${mouse.x}px ${mouse.y}px, rgba(0,245,212,0.12), transparent 40%)`,
          }}
        />
      )}
      {children}
    </Tag>
  )
}
