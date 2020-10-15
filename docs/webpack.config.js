const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const PROJECT_PATH = process.cwd();
const DEV_HOST = '0.0.0.0';
const DEV_PORT = '3001';

const DEV_SERVER = 'webpack-dev-server/client?http://' + DEV_HOST + ':' + DEV_PORT;
const HOT_SERVER = 'webpack/hot/only-dev-server';


const ENTRY = {
  index: './src/index',
};


module.exports = {
  entry: Object.keys(ENTRY).reduce((memo, key) => {
    memo[key] = [DEV_SERVER, HOT_SERVER, ENTRY[key]];
    return memo;
  }, {}),

  output: {
    filename: '[name]-stamp4hash.js',
    publicPath: 'http://' + DEV_HOST + ':' + DEV_PORT + '/static/js/',
  },

  resolve: {
    modules: [ path.resolve(PROJECT_PATH, 'src'), 'node_modules' ],
    extensions: ['.js', '.jsx', '.css', '.scss'],
    alias: {
      'src': path.resolve(PROJECT_PATH, 'src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]-[local]-[hash:base64:5]',
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 50000,
            }
          },
        ],
      }
    ],
  },

  devtool: 'cheap-module-eval-source-map',

  plugins: [
    new StyleLintPlugin(),
    new HotModuleReplacementPlugin(),
  ],

  devServer: {
    host: DEV_HOST,
    port: DEV_PORT,
    sockPort: DEV_PORT,
    contentBase: path.join(PROJECT_PATH),
    historyApiFallback: true,
    hot: true,
    stats: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
};
