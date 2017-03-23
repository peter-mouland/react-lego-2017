const webpack = require('webpack');

const { SRC } = require('./paths');
const defaultConfig = require('./webpack.common');

const devConfig = Object.assign({}, defaultConfig, {
  entry: {
    app: [`webpack-dev-server/client?http://localhost:${process.env.PORT || 8080}/`, `${SRC}/styles/app.scss`, `${SRC}/client-entry.js`],
    'promise-polyfill': [`${SRC}/promise-polyfill.js`]
  }
});

devConfig.plugins.unshift(new webpack.HotModuleReplacementPlugin());

module.exports = devConfig;
