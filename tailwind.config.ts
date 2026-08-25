import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#150B1A",       // near-black plum — dark section bg
        plum: "#3B1550",      // deep purple base
        magenta: "#C42D8E",   // primary brand color (from logo)
        "magenta-light": "#E14FAA",
        pink: "#F2679A",      // secondary accent
        ember: "#FF7A45",     // heat accent — CTAs, energy
        "ember-light": "#FF9A6B",
        cream: "#FFF6EF",     // light bg
        charcoal: "#201622",  // body text on light bg
        mist: "#C9B8D4",      // muted text on dark bg
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      backgroundImage: {
        "heat-gradient": "linear-gradient(90deg, #C42D8E 0%, #FF7A45 100%)",
        "plum-glow": "radial-gradient(circle at 50% 30%, rgba(196,45,142,0.35), transparent 60%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
