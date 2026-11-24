/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0f2557", 900: "#0a1a3f" },
        brand: { DEFAULT: "#f97316", 400: "#fb923c", 600: "#ea6a0a" },
        steel: { 100: "#e8eefa" },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans Variable"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 10px 40px -10px rgba(15, 37, 87, 0.18)",
        orange: "0 12px 28px -8px rgba(249, 115, 22, 0.55)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scrollDot: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(10px)", opacity: "0" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        scrollDot: "scrollDot 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
