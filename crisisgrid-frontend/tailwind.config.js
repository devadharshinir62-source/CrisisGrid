/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        command: {
          950: '#070b14',
          900: '#0d1527',
          850: '#111c34',
          800: '#172442',
          700: '#233660',
          600: '#324e86',
        },
        crisis: {
          critical: '#ef4444',
          high: '#f97316',
          medium: '#eab308',
          low: '#22c55e',
        }
      },
      animation: {
        'pulse-subtle': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [],
}
