const path = require("path");

const vuxLoader = require('vux-loader')

module.exports = {
  outputDir: path.resolve(__dirname, "./dist/"),
  assetsDir: "./admin/static/",
  configureWebpack: config => {
    vuxLoader.merge(config, {
      plugins: [
        {
          name:'vux-ui'
        },
        {
          name: 'less-theme',
          path: 'src/style/theme.less'
        },
      ]
    }) 
  },
  devServer: {
    disableHostCheck: true,
  },
  lintOnSave: false
}