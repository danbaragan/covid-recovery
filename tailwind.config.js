module.exports = {
  purge: {
    content: [
      './public/*.html',
      './src/**/*.js',
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Trebuchet MS", "Palatino", "serif"],
      },
      colors: {
        lime: {
          '400': '#aaff00',
          '500': '#99e600',
          '600': '#88cc00',
          '700': '#669900',
          '800': '#568200',
          '900': '#4C7300',
        },
      },
      container: {
        center: true,
        padding: '3rem',
      }
    },
  },
  variants: {},
  plugins: [],
}
