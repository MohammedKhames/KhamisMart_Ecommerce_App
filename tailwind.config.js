/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-orange": "#FF9900",
        "brand-navy": "#131921",
      },},
     container: {
      center: true,
      padding: "1rem",
    },
  },
  plugins: [],
};

