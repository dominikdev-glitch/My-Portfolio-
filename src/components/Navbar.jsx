import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { styles } from "../styles";
import { navLinks, profile } from "../constants";
import { logo } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <header
      className={`${styles.paddingX} w-full fixed top-0 left-0 z-30 bg-[#070913]/95 border-b border-white/[0.08]`}
    >
      <div className="w-full max-w-7xl mx-auto h-14 sm:h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single-line Brand wordmark */}
        <Link
          to="/"
          className="flex items-center gap-2 min-w-0 whitespace-nowrap shrink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff] rounded-md"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={logo}
            alt="Ibekwe Somtochukwu logo"
            className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0"
            width={32}
            height={32}
          />
          <span className="font-display text-white text-[15px] sm:text-[17px] font-bold tracking-tight truncate">
            {profile.name}
          </span>
        </Link>

        {/* Zone 2: Concise single-line text nav links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setActive(link.title)}
              className={`text-[14px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 border-b-2 py-1 ${
                active === link.title
                  ? "text-white border-[#915eff]"
                  : "text-secondary border-transparent hover:text-white hover:border-white/30"
              }`}
            >
              {link.title}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            onClick={() => setActive("Contact")}
            className="hidden md:inline-flex items-center justify-center py-2 px-4 rounded-lg bg-[#915eff] hover:bg-[#7e4be6] text-white text-[14px] font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Contact
          </a>

          <button
            type="button"
            aria-label={toggle ? "Close menu" : "Open menu"}
            aria-expanded={toggle}
            onClick={() => setToggle(!toggle)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {toggle ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-72 bg-[#070913] border-l border-white/[0.08] shadow-2xl transition-transform duration-200 z-40 ${
          toggle ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6 p-6">
          <div className="w-full flex items-center justify-between border-b border-white/[0.08] pb-4">
            <span className="font-display font-bold text-white text-base">
              {profile.handle}
            </span>
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setToggle(false)}
              className="w-11 h-11 inline-flex items-center justify-center rounded-lg text-secondary hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => {
                  setActive(link.title);
                  setToggle(false);
                }}
                className="py-3 px-2 text-[16px] text-secondary hover:text-white font-medium transition-colors"
              >
                {link.title}
              </a>
            ))}
          </div>

          <a
            href={profile.cvUrl}
            download={profile.cvFilename}
            onClick={() => setToggle(false)}
            className="inline-flex items-center justify-center py-3 px-5 rounded-lg bg-surface border border-white/[0.14] hover:border-[#915eff] text-white text-[15px] font-medium transition-colors"
          >
            Download CV
          </a>

          <a
            href="#contact"
            onClick={() => setToggle(false)}
            className="inline-flex items-center justify-center py-3 px-5 rounded-lg bg-[#915eff] hover:bg-[#7e4be6] text-white text-[15px] font-semibold transition-colors"
          >
            Contact
          </a>
        </div>
      </div>

      {toggle && (
        <div
          onClick={() => setToggle(false)}
          className="md:hidden fixed inset-0 bg-black/60 z-30"
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Navbar;
