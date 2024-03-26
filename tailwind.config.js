/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      sans: ["Roboto", "sans-serif"],
      open: ["Open Sans", "sans-serif"],
    },
  },
  plugins: [],
};
