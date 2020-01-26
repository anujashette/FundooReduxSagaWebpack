const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],

      },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      // {
      //   test: /\.css$/,
      //   exclude: /node_modules/,
      //   use: [
      //     'style-loader',
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: true,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        use: ['url-loader']
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },

      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&mimetype=application/octet-stream"
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: "file-loader"
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: ['node_modules']
  },
  output: {
    path: path.join(__dirname + '/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

  ],
  devServer: {
    contentBase: './dist',
    inline: true,
    hot: true,
    // host:'192.168.0.90',
    port: '4200',
    historyApiFallback: true
  }
};


// new HtmlWebpackPlugin({
//   template: path.join(__dirname + '/dist/index.html'),
//   filename: './index.html',
//   favicon: "./dist/keep.png"
// })






// module.exports = {
//   module: {
//     rules: [
//       {
//         test: /\.jsx$/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             cacheDirectory: true,
//             presets: ['react','es2015', 'stage-2']
//           }
//         }
//       }, {
//         test: /\.css$/,
//         use: [
//           'style-loader',
//           'css-loader'
//         ]
//       },
//       {
//         test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
//         use: "url-loader?limit=10000&mimetype=application/font-woff"
//       }, {
//         test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
//         use: "url-loader?limit=10000&mimetype=application/font-woff"
//       }, {
//         test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
//         use: "url-loader?limit=10000&mimetype=application/octet-stream"
//       }, {
//         test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
//         use: "file-loader"
//       }, {
//         test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
//         use: "url-loader?limit=10000&mimetype=image/svg+xml"
//       }
//     ]
//   },
//   resolve: {
//     modules: ['node_modules']
//   }
// };