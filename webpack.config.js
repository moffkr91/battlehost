const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundlefile.js'
  },
  module: {
    rules: [
      {
         test: /\.js$/,
         exclude: /node_modules/,
         use: {
           loader: 'babel-loader'
         }
      },
      // {
      //   test: /\.scss$/,
      //   loaders: [
      //     require.resolve('style-loader'),
      //     require.resolve('css-loader'),
      //     require.resolve('sass-loader')
      //   ]
      // },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 2,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
           'sass-loader'
         ]
        })
      },
      {
        exclude: [/\.(js|jsx|mjs)$/,/\.html$/,/\.json$/, /\.scss$/],
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
   ]
  },
  plugins: [
    new HtmlWebpackPlugin({
       template: './src/index.html'
    }),
    new ExtractTextPlugin({filename: 'styles.css', allChunks: true})
  ]
}


