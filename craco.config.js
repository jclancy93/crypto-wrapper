module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  // webpack: {
  //   alias: {
  //     environment: path.join(__dirname, ')
  //   }
  // },
}