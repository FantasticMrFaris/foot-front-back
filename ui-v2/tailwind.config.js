/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#00695C',
          600: '#004d40',
          700: '#00332b',
          800: '#001f1a',
          900: '#001611',
        },
        'dark-teal': {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#045D5D',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        accent: {
          500: '#EE6AF0',
          600: '#d946ef',
          700: '#c026d3',
        },
        'white-gold': {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#EE6AF0',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-soft': 'bounceSoft 0.6s ease-in-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #EE6AF0, 0 0 10px #EE6AF0, 0 0 15px #EE6AF0' },
          '100%': { boxShadow: '0 0 10px #EE6AF0, 0 0 20px #EE6AF0, 0 0 30px #EE6AF0' },
        }
      },
      boxShadow: {
        'white-gold': '0 0 0 1px #EE6AF0',
        'dark-teal': '0 4px 6px -1px rgba(4, 93, 93, 0.1), 0 2px 4px -1px rgba(4, 93, 93, 0.06)',
        'premium': '0 0 0 2px #EE6AF0, 0 8px 25px -5px rgba(4, 93, 93, 0.3)',
      }
    },
  },
  plugins: [],
};