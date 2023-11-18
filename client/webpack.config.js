const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

const is_prod = process.env.NODE_ENV === 'production'

const plugins =  [
  new HtmlWebpackPlugin({
    template: './index.html',
    filename: 'index.html',
  }),  
]

if (is_prod) {
  plugins.push(...[
    new WebpackPwaManifest({
      name: 'Not Another Text Editor',
      short_name: 'NATE',
      description: 'A text editor for use on and offline.',
      background_color: '#fff',
      theme_color: '#000',
      publicPath: '/',
      inject: true,
      icons: [
        {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
        },
      ],
    }),
    new InjectManifest({
      swSrc: './src-sw.js',
      swDest: 'service-worker.js',
    })
  ])
}

module.exports = () => {
  return {
    mode: is_prod ? 'production' : 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };
};