module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Masqualero', 'serif'],
        demi: ['Masqualero DemiBold', 'serif'],
      },
      colors: {
        purple: '#070490',
        green: '#429004',
        brown: '#900404',
        lemon: '#908204',
        indigoGray: {
          5: '#F8F9FC',
          10: '#F1F3F9',
          20: '#E2E5F0',
          30: '#CBD0E1',
          40: '#949BB8',
          50: '#646B8B',
          60: '#474A69',
          70: '#333655',
          80: '#1E1E3B',
          90: '#110F2A',
        },
      },
      opacity: {
        3: '.03',
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
