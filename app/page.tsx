import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(139,92,246,0.2), 0 20px 40px rgba(91,33,182,0.35)',
      },
      backgroundImage: {
        hero: 'radial-gradient(circle at top, rgba(139,92,246,0.28), transparent 30%), linear-gradient(135deg, #09090f 0%, #111827 40%, #140f24 100%)',
      },
    },
  },
  plugins: [],
};

export default config;

