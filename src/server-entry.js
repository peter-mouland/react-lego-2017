require('babel-polyfill');
const hook = require('node-hook').hook;
const webpackAssets = require('../compiled/webpack-assets.json'); // eslint-disable-line import/no-unresolved
const mapWebpackAssets = require('./server/utils/mapWebpackAssets');

hook('.scss', () => '');

const assets = mapWebpackAssets(webpackAssets);
const createServer = require('./server/server'); //eslint-disable-line
createServer(assets).listen(process.env.PORT || 8080, () => {
  console.log(`listening at http://localhost:${process.env.PORT || 8080}`); // eslint-disable-line
});
