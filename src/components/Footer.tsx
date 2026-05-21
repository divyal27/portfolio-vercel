export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-8 px-4 border-t" style={{ borderColor: "oklch(from #1A1A1A l c h / 0.10)" }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[#6B7280] text-sm">
          &copy; {year} Divyal Padalkar. Built with Next.js &amp; Tailwind
        </p>

        <div className="flex items-center gap-4 text-xs text-[#6B7280] font-mono">
          <span style={{ color: "#01696F" }}>&lt;/&gt;</span>
          <span>DevOps Portfolio v2.0</span>
        </div>
      </div>
    </footer>
  )
}
