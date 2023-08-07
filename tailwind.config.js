/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/index.html", "./src/js/*.js"],
  theme: {
    extend: {
      fontFamily: {
        "font-text": ["Quicksand", "sans-serif"],
        "font-title": ["Raleway", "sans-serif"],
      },
    },
  },
  plugins: [],
};

