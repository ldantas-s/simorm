const path = require("path");

module.exports = {
  entry: {
    app: ["regenerator-runtime/runtime.js", "./src/index.js"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_moudles/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    ],
  },
};
