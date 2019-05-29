const path = require("path");

module.exports = {
  publicPath: "asset-map/",
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, "./src/styles/global.scss")]
    }
  }
}
