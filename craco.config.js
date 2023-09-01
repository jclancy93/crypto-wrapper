module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  babel: {
    plugins: [
      "@babel/plugin-proposal-nullish-coalescing-operator",
      "@babel/plugin-proposal-optional-chaining",
    ],
  },
  // webpack: {
  //   alias: {
  //     environment: path.join(__dirname, ')
  //   }
  // },
};
