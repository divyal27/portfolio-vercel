"use client"

import { cn } from "@/lib/utils"
import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react"

type Variant = "primary" | "outline" | "ghost"
type Size = "sm" | "md" | "lg"

interface BaseProps {
  variant?: Variant
  size?: Size
  loading?: boolean
  icon?: React.ReactNode
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { as?: "button" }

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { as: "a" }

type AnimatedButtonProps = ButtonAsButton | ButtonAsLink

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary text-dark font-semibold hover:bg-primary/90 shadow-[0_0_20px_rgba(0,245,212,0.3)] hover:shadow-[0_0_30px_rgba(0,245,212,0.5)]",
  outline:
    "border border-primary text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(0,245,212,0.15)]",
  ghost:
    "text-slate hover:text-primary hover:bg-white/5",
}

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-sm",
}

const AnimatedButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, AnimatedButtonProps>(
  (props, ref) => {
    const {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      className,
      children,
      ...rest
    } = props

    const classes = cn(
      "inline-flex items-center justify-center gap-2 rounded-lg font-mono transition-all duration-300",
      "active:scale-95",
      variantStyles[variant],
      sizeStyles[size],
      loading && "pointer-events-none opacity-70",
      className,
    )

    if (props.as === "a") {
      const { as: _, variant: _v, size: _s, loading: _l, icon: _i, ...anchorRest } = props as ButtonAsLink
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...(anchorRest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {loading ? (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : icon ? (
            icon
          ) : null}
          {children}
        </a>
      )
    }

    const { as: _, variant: _v, size: _s, loading: _l, icon: _i, ...buttonRest } = props as ButtonAsButton
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        disabled={loading}
        {...(buttonRest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {loading ? (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : icon ? (
          icon
        ) : null}
        {children}
      </button>
    )
  },
)

AnimatedButton.displayName = "AnimatedButton"
export { AnimatedButton }
export type { AnimatedButtonProps, Variant, Size }
