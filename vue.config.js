// 引入path
const path = require("path");

module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        path.join(__dirname, "src", "assets", "styles", "variables.less"),
        path.join(__dirname, "src", "assets", "styles", "mixin.less"),
      ],
    },
  },
  //  基本路径
  publicPath: "./",
  //  构建时的输出目录
  outputDir: "dist",
};
