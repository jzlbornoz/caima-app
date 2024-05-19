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
        backgroundColor: "#1E1E1E",
        secondBackgroundColor: "#2d2d2d",
        titleColor: "#e0e0e0",
        textColor: "#FFFFFF",
        errorColor: "#d13048",
        secondaryColor: "#003f8f",
        lightSecondaryColor: "#2196F3",
        primaryColor: "#FF5722",
        lightPrimaryColor: "#ff8a50",
      },
    },
  },
  plugins: [],
};
