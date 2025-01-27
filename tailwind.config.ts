/** @type {import('tailwindcss').Config} */
const { Kantumruy_Pro } = require("next/font/google");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1440px",
      "2xl": "2560px",
    },
    extend: {
      backgroundImage: {
        "custom-gradient":
            "linear-gradient(100deg, rgba(255, 165, 174, 0.08) 0%, rgba(255, 204, 209, 0.08) 100%)",
      },
      textColor: {
        "color-1": "#FEFEFE",
        "color-2": "#2B2B2B",
        normal: "#33363F",
      },
      colors: {
        primary: "#D7AD45",
        secondary: "#AC1927",
        focus: "#979797",
        "background-1": "#F6EEE3",
        customGreen: "#065F46",
        customBlue: "#44428C",
        lightgray:"#F5F5F5",

      },
      fontFamily: {
        moulpali: ["Moulpali", "sans-serif"],
        hanuman: ["Hanuman", "serif"],
        kantumruy: ["Kantumruy Pro", "serif"],
      },
      fontSize: {
        title: "18px",
        body: "15px",
        subtitle: "17px",
        caption: "12px",
        h4: "18px",
        h3: "20px",
        h2: "24px",
        h1: "30px",
      },
    },
  },
  // plugins: [require("daisyui")],
};
