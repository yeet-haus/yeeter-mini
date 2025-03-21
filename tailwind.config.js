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
      width: {
        768: "768px",
      },
    },
  },
  daisyui: {
    themes: [
      {
        beerrun: {
          primary: "#E8AE4C",
          secondary: "#D06B49",
          accent: "#9EB5AD",
          neutral: "#F6F5F2",
          "base-100": "#F6F5F2",
          "base-300": "#374D48",
        },
        funderful: {
          primary: "#E54047",
          secondary: "#9290A9",
          accent: "#EB7450",
          neutral: "#F8FAFA",
          "base-100": "#F8FAFA",
          "base-300": "#2E2F3E",
          "background-color": "#F8FAFA",
        },
        weeyeet: {
          ...require("daisyui/src/theming/themes")["corporate"],
        },
      },
      "dark",
    ],
  },
  plugins: [require("daisyui")],
};
