module.exports = {
  entry: './examples/main.jsx',
  output: {
    path: './examples',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?stage=0'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader', 'babel-loader?stage=0']
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style!css-loader?module'
      }
    ]
  },
  resolve: {
    alias: {
      root: require('path').resolve('.')
    },
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'eval'
};
