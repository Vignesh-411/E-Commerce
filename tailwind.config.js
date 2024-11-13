/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        'custom': '0px 0px 33px 13px rgba(0, 0, 0, 0.75)',
      }
    },
  },
  plugins: [],
}

