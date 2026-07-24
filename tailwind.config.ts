import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf7ed',
          100: '#f8e3c4',
          500: '#d97706',
          600: '#b45309',
          900: '#3f2a04',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
