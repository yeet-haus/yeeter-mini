/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Lato", "sans-serif"],
    },
    extend: {
      fontFamily: {
        body: ["Lato", "sans-serif"],
        header: ["Fugaz One", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
