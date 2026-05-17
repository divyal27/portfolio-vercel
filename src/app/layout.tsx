import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Divyal Padalkar | DevOps & SRE Engineer",
  description:
    "Portfolio of Divyal Padalkar — DevOps Engineer building scalable, reliable, and automated cloud systems using Kubernetes, Terraform, and CI/CD pipelines.",
  openGraph: {
    title: "Divyal Padalkar | DevOps & SRE Engineer",
    description:
      "Portfolio of Divyal Padalkar — DevOps Engineer building scalable, reliable, and automated cloud systems.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${mono.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
