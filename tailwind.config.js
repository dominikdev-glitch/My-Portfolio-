/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Outfit", "system-ui", "sans-serif"],
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        primary: "#070913",
        surface: "#0E1222",
        tertiary: "#14192E",
        secondary: "#A5A3BD",
        "black-100": "#0E1222",
        "black-200": "#090C18",
        "white-100": "#F3F4F6",
        accent: "#915EFF",
      },
      boxShadow: {
        card: "0px 24px 64px -20px rgba(7, 9, 19, 0.85)",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
};
