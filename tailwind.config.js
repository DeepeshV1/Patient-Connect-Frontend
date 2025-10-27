/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enables dark mode via class strategy
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: "var(--theme-color)", // Global accent color variable
      },
      transitionProperty: {
        theme: "background-color, color, border-color, fill, stroke",
      },
      transitionDuration: {
        300: "300ms",
        500: "500ms",
      },
      transitionTimingFunction: {
        smooth: "ease-in-out",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
  ],
};
