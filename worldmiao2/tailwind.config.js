module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // colors: {
    //   wmBlue: '#F0F8FF',
    //   wmWhite: '#f8f9fa',
    //   wmGray: '#a5a5ab'
    //
    // },
    extend: {
      backgroundImage: theme => ({
        'texture': "url('texture.png')",

      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
