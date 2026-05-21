import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"

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
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=cabinet-grotesk@700,800&display=swap"
        />
      </head>
      <body className={`${mono.variable} font-body`}>
        {children}
      </body>
    </html>
  )
}
