module.exports = {
  entry: ["./source/App.js"],
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel",
        query: {
          presets: ["es2015", "react"]
        }
      }
    ]
  }
};
