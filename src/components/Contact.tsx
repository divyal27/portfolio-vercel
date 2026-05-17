"use client"

import { useState, useRef } from "react"
import { FiSend, FiMail, FiMapPin, FiGithub, FiLinkedin } from "react-icons/fi"

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const name = (form.elements.namedItem("name") as HTMLInputElement).value
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value

    const subject = encodeURIComponent(`Portfolio Contact: ${name}`)
    const body = encodeURIComponent(
      `From: ${name}\nEmail: ${email}\n\n${message}`
    )

    window.open(`mailto:888divyal.3@gmail.com?subject=${subject}&body=${body}`, "_blank")
  }

  return (
    <section id="contact" className="py-20 px-4 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-light mb-2">
          <span className="text-primary font-mono">&gt;</span> Get In Touch
        </h2>
        <p className="text-slate mb-10">Let&apos;s build something together</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass p-8">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm text-slate mb-1 block">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-2.5 bg-dark border border-white/10 rounded-lg text-light placeholder-slate focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm text-slate mb-1 block">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-2.5 bg-dark border border-white/10 rounded-lg text-light placeholder-slate focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-sm text-slate mb-1 block">Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 bg-dark border border-white/10 rounded-lg text-light placeholder-slate focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-primary text-dark font-semibold rounded-lg hover:bg-primary/90 transition-all font-mono text-sm"
              >
                Send Message
                <FiSend size={16} />
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="glass p-6 flex items-center gap-4">
              <FiMail className="text-primary shrink-0" size={20} />
              <div>
                <p className="text-sm text-slate">Email</p>
                <a
                  href="mailto:888divyal.3@gmail.com"
                  className="text-light hover:text-primary transition-colors"
                >
                  888divyal.3@gmail.com
                </a>
              </div>
            </div>

            <div className="glass p-6 flex items-center gap-4">
              <FiMapPin className="text-primary shrink-0" size={20} />
              <div>
                <p className="text-sm text-slate">Location</p>
                <p className="text-light">Pune, India</p>
              </div>
            </div>

            <div className="glass p-6">
              <p className="text-sm text-slate mb-3">Social</p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/divyal27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-slate hover:text-primary hover:bg-white/10 transition-all"
                >
                  <FiGithub size={18} /> GitHub
                </a>
                <a
                  href="https://linkedin.com/in/divyal-padalkar2704"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-slate hover:text-primary hover:bg-white/10 transition-all"
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
