/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Logo blue is ~#2F3B94. Dark surfaces are a deep blue; "accent" is a light periwinkle used for
          // text, borders and glows on dark backgrounds (readable, unlike the logo blue itself).
          navy: '#0A1442',
          'navy-light': '#101C5E',
          royal: '#3D4FC7',
          'royal-dark': '#2F3B94',
          accent: '#9DAAF8',
          'accent-light': '#C7CFFD',
          'accent-dark': '#6B7CE8',
          white: '#F8F9FA',
          'white-soft': '#E8ECEF',
          dark: '#060B2B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        thai: ['Sarabun', 'ui-sans-serif', 'system-ui'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-out forwards',
        'slide-up': 'slideUp 1s ease-out forwards',
        'slide-down': 'slideDown 1s ease-out forwards',
        'scale-in': 'scaleIn 0.8s ease-out forwards',
        'rotate-in': 'rotateIn 1s ease-out forwards',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        rotateIn: {
          '0%': { opacity: '0', transform: 'rotate(-5deg) scale(0.95)' },
          '100%': { opacity: '1', transform: 'rotate(0) scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
        '1200': '1200ms',
      },
    },
  },
  plugins: [],
};