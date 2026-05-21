"use client"

import { useRef } from "react"
import { FiSend, FiMail, FiMapPin, FiGithub, FiLinkedin } from "react-icons/fi"
import FadeContent from "@/components/ui/FadeContent"

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const name = (form.elements.namedItem("name") as HTMLInputElement).value
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value

    const subject = encodeURIComponent(`Portfolio Contact: ${name}`)
    const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)

    window.open(`mailto:888divyal.3@gmail.com?subject=${subject}&body=${body}`, "_blank")
  }

  return (
    <section id="contact" className="py-20 px-4 bg-[#F0F7F7]">
      <div className="max-w-6xl mx-auto">
        <FadeContent blur={true} duration={800} ease="ease-out">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#1A1A1A] mb-2">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-[#01696F] rounded mb-4" />
          <p className="text-[#6B7280] mb-10">Let&apos;s build something together</p>
        </FadeContent>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card p-8">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm text-[#6B7280] mb-1 block">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-lg text-[#1A1A1A] placeholder-[#6B7280] focus:outline-none focus:border-[#01696F]/50 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm text-[#6B7280] mb-1 block">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-lg text-[#1A1A1A] placeholder-[#6B7280] focus:outline-none focus:border-[#01696F]/50 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-sm text-[#6B7280] mb-1 block">Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-lg text-[#1A1A1A] placeholder-[#6B7280] focus:outline-none focus:border-[#01696F]/50 transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#01696F] text-white rounded-lg hover:bg-[#0C4E54] transition-all font-mono text-sm font-semibold"
              >
                <FiSend size={16} /> Send Message
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="card p-6 flex items-center gap-4">
              <FiMail className="text-[#01696F] shrink-0" size={20} />
              <div>
                <p className="text-sm text-[#6B7280]">Email</p>
                <a
                  href="mailto:888divyal.3@gmail.com"
                  className="text-[#1A1A1A] hover:text-[#01696F] transition-colors"
                >
                  888divyal.3@gmail.com
                </a>
              </div>
            </div>

            <div className="card p-6 flex items-center gap-4">
              <FiMapPin className="text-[#01696F] shrink-0" size={20} />
              <div>
                <p className="text-sm text-[#6B7280]">Location</p>
                <p className="text-[#1A1A1A]">Pune, India</p>
              </div>
            </div>

            <div className="card p-6">
              <p className="text-sm text-[#6B7280] mb-3">Social</p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/divyal27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-lg text-[#6B7280] hover:text-[#01696F] hover:bg-teal-100 transition-all"
                >
                  <FiGithub size={18} /> GitHub
                </a>
                <a
                  href="https://linkedin.com/in/divyal-padalkar2704"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-lg text-[#6B7280] hover:text-[#01696F] hover:bg-teal-100 transition-all"
                >
                  <FiLinkedin size={18} /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
