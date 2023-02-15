/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // colors: {
      //   primary: {
      //     light: '#8abdff',
      //     DEFAULT: '#6d5dfc',
      //     dark: '#5b0eeb',
      //   },
      // },
      // boxShadow: {
      //   DEFAULT: '0.3rem 0.3rem 0.6rem #c8d0e7, -0.2rem -0.2rem 0.5rem #ffffff',
      // },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
