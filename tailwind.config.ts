import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-kantumruy-pro)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Custom colors
        "sidebar-active-bg": "#FFA5AE",
        "sidebar-hover-bg": "#FFCCD1",
        "sidebar-active-text": "#AC1927",
        "bg-dashboard": "#F5F5F5",
      },
    },
  },
  plugins: [flowbite.plugin(),],
} satisfies Config;
