export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E6F2EA",
          100: "#C2DFD0",
          200: "#99CAB3",
          300: "#6FB595",
          400: "#4DA47D",
          500: "#007A33",
          600: "#006E2E",
          700: "#005F27",
          800: "#004F20",
          900: "#003A17",
        },
        neutral: {
          50: "#FDFBF7",
          100: "#F6F2EB",
          200: "#E8E2D8",
          300: "#D4CCC0",
          400: "#B0A69A",
          500: "#8C8074",
          600: "#6B5F53",
          700: "#4A3F35",
          800: "#2C241E",
          900: "#1C1B1A",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
};
