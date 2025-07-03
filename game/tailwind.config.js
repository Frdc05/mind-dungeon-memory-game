
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-out': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.5)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-4px)' },
          '40%': { transform: 'translateX(4px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(4px)' },
        },

        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },

        flipBack: {
          '0%': { transform: 'rotateY(180deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
      },

      animation: {
        'fade-out': 'fade-out 1s ease-in-out forwards',
        shake: 'shake 0.4s ease-in-out',
        flip: 'flip 0.6s ease-in-out forwards',
        flipBack: 'flipBack 0.6s ease-in-out forwards',
      },

      fontFamily: {
        rubik: ['"Rubik"', 'sans-serif'],
        jersey: ['"Jersey 25"', 'cursive'],
        pixelify: ['"Pixelify Sans"', 'sans-serif'],
      },


    },
  },
  plugins: [],
}
