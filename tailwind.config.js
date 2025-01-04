/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-grey": "#e8ebf2",
        "light-grey-200": "#e0e8f4",
        "dark-blue": "#0B2D54",
        "dark-grey": "#6F809B",
      },
    },
  },
  plugins: [],
};
