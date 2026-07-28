import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-barlow)', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['var(--font-archivo)', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#fdf2f2',
          100: '#fbd5d5',
          300: '#f5938a',
          400: '#e63b3b',
          500: '#c8181f',
          600: '#9e1219',
          900: '#3a0709',
        },
        ink: {
          100: '#e9ecef',
          200: '#c2c9d0',
          300: '#a7b0b9',
          400: '#8a949e',
          450: '#6c757e',
          500: '#5d6772',
          note: '#7b8590',
          soft: '#6c7681',
          600: '#2b333c',
          700: '#1b232c',
          800: '#1f2933',
          900: '#131b24',
          950: '#0b1016',
        },
        bone: {
          50: '#faf8f5',
          100: '#f4f2ee',
          200: '#e2ddd5',
          300: '#ddd7cd',
          400: '#c2b8a8',
          500: '#d9c9ac',
          hover: '#eeebe4',
          active: '#e8e4db',
          label: '#8b8579',
        },
        ember: {
          heading: '#ffffff',
          ink: '#ffffff',
          body: '#ffeaea',
          kicker: '#ffe0e0',
          line: '#e88a8a',
          hover: '#9e1219',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
