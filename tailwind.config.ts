import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0d1117',
        surface: '#161b22',
        'surface-hover': '#1c2128',
        border: '#30363d',
        'text-primary': '#e6edf3',
        'text-secondary': '#8b949e',
        accent: '#dc2626',
        'accent-hover': '#b91c1c',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#e6edf3',
            a: { color: '#dc2626' },
            h1: { color: '#e6edf3' },
            h2: { color: '#e6edf3' },
            h3: { color: '#e6edf3' },
            strong: { color: '#e6edf3' },
            code: { color: '#e6edf3' },
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
