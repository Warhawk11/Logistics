module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        text_713: 'text_713 3.5s ease both infinite',
        loading_713: 'loading_713 3.5s ease both infinite',
        loading2_713: 'loading2_713 3.5s ease both infinite',
        blink: 'blink 1s infinite', 
      },
      keyframes: {
        text_713: {
          '0%': { letterSpacing: '1px', transform: 'translateX(0px)' },
          '40%': { letterSpacing: '2px', transform: 'translateX(26px)' },
          '80%': { letterSpacing: '1px', transform: 'translateX(32px)' },
          '90%': { letterSpacing: '2px', transform: 'translateX(0px)' },
          '100%': { letterSpacing: '1px', transform: 'translateX(0px)' },
        },
        loading_713: {
          '0%': { width: '16px', transform: 'translateX(0px)' },
          '40%': { width: '100%', transform: 'translateX(0px)' },
          '80%': { width: '20px', transform: 'translateX(74px)' },
          '90%': { width: '100%', transform: 'translateX(0px)' },
          '100%': { width: '16px', transform: 'translateX(0px)' },
        },
        loading2_713: {
          '0%': { transform: 'translateX(0px)', width: '16px' },
          '40%': { transform: 'translateX(0%)', width: '80%' },
          '80%': { width: '100%', transform: 'translateX(0px)' },
          '90%': { width: '80%', transform: 'translateX(15px)' },
          '100%': { transform: 'translateX(0px)', width: '16px' },
        },
        blink: {
          '0%': { backgroundColor: 'rgba(248, 113, 113, 0)' }, // Fully transparent
          '50%': { backgroundColor: 'rgba(248, 113, 113, 1)' },      // Fully red (bg-red-300)
          '100%' : { backgroundColor: 'rgba(248, 113, 113, 0)' }
        },
      },
    },
  },
  plugins: [],
}