import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Tech from "./components/Tech";
import Works from "./components/Works";
import Contact from "./components/Contact";
import { StarsCanvas } from "./components/canvas";
import { profile } from "./constants";

const Home = () => {
  return (
    <div className="relative z-0 bg-[#070913] min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Tech />
        <Works />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </main>

      <footer className="border-t border-white/[0.08] py-8 px-5 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[13px] text-secondary">
          <p>
            {profile.name}
            <span className="mx-2 text-white/25" aria-hidden="true">
              ·
            </span>
            {profile.role}
            <span className="mx-2 text-white/25" aria-hidden="true">
              ·
            </span>
            {profile.location}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href={profile.cvUrl}
              download={profile.cvFilename}
              className="hover:text-white transition-colors"
            >
              Download CV
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-white transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
