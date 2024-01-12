const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const reactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  // Mode
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    // Path: 01-github-explorer/public/bundle.js
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
    hot: true,
  },
  // Plugins
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    isDevelopment && new reactRefreshWebpackPlugin(),
  ].filter(Boolean),
  module: {
    // Loaders
    rules: [
      {
        // Regex to match all files that end with .tsx
        test: /\.tsx$/,
        // Exclude node_modules
        exclude: /node_modules/,
        // Use babel-loader
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
}
