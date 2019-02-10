// module.exports = {
//     entry: './src/app.js',
//     output: {
//         filename:'./dist/app.bundle.js'
//     }
//}

var webpack = require('webpack');
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin')


var BUILD_DIR = path.join(__dirname, 'dist');
var APP_DIR = path.join(__dirname, 'src');
const VENDOR_LIBS = [
  'react',
  'react-dom'

];

var config = {
  //entry: APP_DIR + '/app.js',
  entry: {
    bundle: APP_DIR + '/app.js',
    vendors: VENDOR_LIBS
  },
  output: {
    //path: BUILD_DIR,
    //filename: 'app.bundle.js'
    chunkFilename:'[name].js',
    path: path.resolve(__dirname, 'dist'),
    filename:'[name].[hash].js',
    publicPath:'/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins:['syntax-dynamic-import']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }

    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: BUILD_DIR,
    compress: true,
    port: 9000,
    disableHostCheck: false,
    hot:true
  },
  plugins: [
    new htmlWebpackPlugin({
      template: APP_DIR + '/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        vendor: {
          chunks: 'all',
          test: /node_modules/
        },
        default: false,
        vendors: false
      }
    }
  },
 
}

module.exports = config;