// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust for your project structure
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B1D51', 
        secondary: '#725CAD',
        accent: '#8CCDEB',
        light: '#FFE3A9',
        danger: '#FF7601',
        dark: '#0a1640',
        dime: '#f1f0f0',
        success: '#10B981',
      },
       maxWidth: {
        'container': '1024px',      
      },
   animation: {
    'fade-up': 'fadeUp 0.3s ease-out',
  },
  keyframes: {
    fadeUp: {
      '0%': { transform: 'translateY(100%)', opacity: 0 },
      '100%': { transform: 'translateY(0)', opacity: 1 },
    },
  },
    },
  },
  plugins: [
    
  ],
}