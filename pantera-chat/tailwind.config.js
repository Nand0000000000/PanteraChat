/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
      extend: {
        colors: {
          'neutral-800': '#1a1d24',
          'neutral-700': '#292b33',
          'neutral-500': '#3a3c44',
          'primary': '#5449cc',
          'primary-hover': '#6254e8',
        }
      },
    },
    plugins: [typography],
  };
  