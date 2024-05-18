/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      height: {
        "10vh": "10vh",
        "90vh": "90vh",
      },
      colors: {
        backgroundColor: "#26292f",
        secondBackgroundColor: "#50778b",
        titleColor: "#9CDCD4",
        textColor: "#e8eee8",
        errorColor: "#d13048",
      },
    },
  },
  plugins: [],
};
