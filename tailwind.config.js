/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 1px 1px 1px rgba(0,0,0,0.2)",
      },
      screens: {
        mobile: { max: "600px" },
      },
    },
  },
  plugins: [],
};
