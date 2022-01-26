module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        purple: '#070490',
        pink: '#A90BC3',
        green: '#429004',
        brown: '#900404',
        lemon: '#908204',
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
