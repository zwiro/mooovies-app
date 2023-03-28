/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        fluid: "repeat(auto-fit, minmax(16rem, 1fr))",
      },
      keyframes: {
        wiggle: {
          "0%": { transform: "translateX(0%)" },
          "50%": { transform: "translateX(-10%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        wiggle: "wiggle 0.4s ease-in-out 2",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
