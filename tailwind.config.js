/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./script.js"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0F2C59",
          darkNavy: "#0A1E3F",
          orange: "#F35F1C",
          orangeHover: "#d94e0e",
          slate: "#334155",
          lightBg: "#F8FAFC",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
};