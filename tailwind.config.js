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
      fontSize: {
        'xs': '.65rem',
      },
      colors: {
        lime: {
          '100': '#D1FF8E',
          '200': '#aaff00',
          '300': '#88cc00',
          '400': '#669900',
          '500': '#568200',
          '600': '#4C7300',
          '700': '#3F5F00',
          '800': '#294300',
          '900': '#172900',
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
