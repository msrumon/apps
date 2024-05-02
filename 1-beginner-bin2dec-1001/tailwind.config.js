/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.ts'],
  theme: {
    extend: {
      lineHeight: {
        12: '3rem',
      },
      padding: {
        2.5: '0.625rem',
      },
    },
  },
  plugins: [],
};
