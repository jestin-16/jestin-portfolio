/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#03030a',
          primary: '#8b5cf6', // Electric purple 
          secondary: '#3b82f6', // Neon blue
          accent: '#6366f1', // Indigo
          light: '#e0e7ff', // Soft lavender
          surface: 'rgba(255, 255, 255, 0.03)',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 7s infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(139, 92, 246, 0.2), 0 0 20px rgba(59, 130, 246, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
