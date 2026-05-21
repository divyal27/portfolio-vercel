import SpotlightNavbar from "@/components/ui/spotlight-navbar"
import AnimatedHero from "@/components/ui/animated-hero"
import Projects from "@/components/Projects"
import Skills from "@/components/Skills"
import CICDPipeline from "@/components/CICDPipeline"
import Experience from "@/components/Experience"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
      <SpotlightNavbar />
      <main>
        <AnimatedHero />
        <Projects />
        <Skills />
        <CICDPipeline />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
