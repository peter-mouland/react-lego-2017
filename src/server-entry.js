/* eslint-disable no-console, import/no-extraneous-dependencies */
const path = require('path');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./config/webpack.config.dev.js');

const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
  contentBase: path.join(__dirname, '..', 'compiled'),
  publicPath: '/dist/',
  hot: true,
  quiet: false,
  noInfo: false,
  stats: {
    colors: true
  }
});

server.listen(process.env.PORT || 8080, '127.0.0.1', () => {
  console.log(`Starting server on http://localhost:${process.env.PORT || 8080}`);
});
