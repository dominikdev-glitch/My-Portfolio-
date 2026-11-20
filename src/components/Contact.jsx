import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Download, Mail } from "lucide-react";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { slideIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { profile } from "../constants";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setStatusMessage(`Email: ${profile.email}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${form.name || "Visitor"}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatusMessage(
      `Prepared email draft for ${profile.email}. You can also copy the address above directly.`
    );
    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 sm:gap-10 items-stretch overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.1, 0.35)}
        className="xl:col-span-6 min-w-0 bg-surface border border-white/[0.08] p-5 sm:p-8 rounded-2xl flex flex-col justify-between"
      >
        <div className="min-w-0">
          <p className={styles.sectionSubText}>Let&apos;s Connect</p>
          <h2 className={`${styles.sectionHeadText} mt-1`}>Get in Touch</h2>
          <p className="text-secondary text-[14px] mt-2">
            {profile.location}
            <span className="mx-2 text-white/30" aria-hidden="true">
              ·
            </span>
            {profile.availability}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="max-w-full min-w-0 inline-flex items-center gap-2 min-h-[44px] py-2 px-3.5 rounded-lg bg-[#070913] border border-white/[0.12] hover:border-[#915eff] text-white text-[12px] sm:text-[13px] font-mono transition-colors duration-150 cursor-pointer"
            >
              <Mail
                className="w-4 h-4 text-[#915eff] shrink-0"
                aria-hidden="true"
              />
              <span className="truncate">{profile.email}</span>
              {copied ? (
                <Check
                  className="w-3.5 h-3.5 text-emerald-400 shrink-0"
                  aria-hidden="true"
                />
              ) : (
                <Copy
                  className="w-3.5 h-3.5 text-secondary shrink-0"
                  aria-hidden="true"
                />
              )}
              <span className="sr-only">
                {copied ? "Copied email address" : "Copy email address"}
              </span>
            </button>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 min-h-[44px] py-2 px-4 rounded-lg bg-[#070913] border border-white/[0.12] hover:border-[#915eff] text-white text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 min-h-[44px] py-2 px-4 rounded-lg bg-[#070913] border border-white/[0.12] hover:border-[#915eff] text-white text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>

            <a
              href={profile.cvUrl}
              download={profile.cvFilename}
              className="inline-flex items-center gap-1.5 min-h-[44px] py-2 px-4 rounded-lg bg-[#070913] border border-white/[0.12] hover:border-[#915eff] text-white text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150"
            >
              <Download className="w-3.5 h-3.5 text-[#915eff]" aria-hidden="true" />
              <span>Download CV</span>
            </a>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-7 sm:mt-8 flex flex-col gap-5"
        >
          <label className="flex flex-col gap-2">
            <span className="text-white text-[14px] font-medium">
              Your Name
            </span>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              className="bg-[#070913] border border-white/[0.1] focus:border-[#915eff] py-3 px-4 placeholder:text-secondary/60 text-white rounded-lg outline-none text-[14px] transition-colors"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-white text-[14px] font-medium">
              Your Email
            </span>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="bg-[#070913] border border-white/[0.1] focus:border-[#915eff] py-3 px-4 placeholder:text-secondary/60 text-white rounded-lg outline-none text-[14px] transition-colors"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-white text-[14px] font-medium">
              Project or Role Details
            </span>
            <textarea
              rows={4}
              name="message"
              required
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about the backend system, smart contract, or remote role..."
              className="bg-[#070913] border border-white/[0.1] focus:border-[#915eff] py-3 px-4 placeholder:text-secondary/60 text-white rounded-lg outline-none text-[14px] transition-colors resize-y"
            />
          </label>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              type="submit"
              className="min-h-[44px] py-3 px-6 rounded-lg bg-[#915eff] hover:bg-[#7e4be6] text-white text-[14px] font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Send Message
            </button>
            {copied && (
              <span className="text-emerald-400 text-[13px] font-medium">
                Email copied to clipboard
              </span>
            )}
          </div>

          {statusMessage && (
            <p className="text-emerald-400 text-[13px] font-medium">
              {statusMessage}
            </p>
          )}
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.1, 0.35)}
        className="xl:col-span-6 min-w-0 h-[260px] sm:h-[360px] lg:h-[420px] xl:h-auto xl:min-h-[460px] rounded-2xl bg-surface/40 border border-white/[0.08] overflow-hidden"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
