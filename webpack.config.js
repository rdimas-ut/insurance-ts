const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: "./"
  },
  devServer: {
    hot: true,
    publicPath: "http://localhost:3000",
    port: 3000,
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), 
    new CopyPlugin({patterns: [ { from: 'assets', to: 'assets' }, { from: 'public/index.html', to: 'index.html' } ]})
  ]
};

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: "./"
  },
  devServer: {
    hot: true,
    publicPath: "http://localhost:8000",
    port: 8000,
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), 
    new CopyPlugin({patterns: [ { from: 'assets', to: 'assets' }, { from: 'public/index.html', to: 'index.html' } ]})
  ],
};