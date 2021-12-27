module.exports = {
  content: ['./index.html', './client/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    screens: {
      sm: '599px',
      md: '959px',
      lg: '1279px',
      xl: '1919px',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      backgroundColor: ['dark'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
};
