/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        lobster: ['Lobster Two', 'cursive'],
        quote: ['Roboto Slab', 'serif'],
      },
    },
  },
  plugins: [],
};
