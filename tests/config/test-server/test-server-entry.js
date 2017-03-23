/* eslint-disable */
require('babel-core/register')({
  only: [/src/, /tests/, /config/]
});
require("babel-polyfill");
const hook = require('node-hook').hook;
const webpackAssets = require('../../../compiled/webpack-assets.json');
const mapWebpackAssets = require('../../../src/server/utils/mapWebpackAssets');

hook('.scss', (source, filename) => ``);

const assets = mapWebpackAssets(webpackAssets);
let openServer;

const startLocalServers = (done) => {
  const createServer = require('../../../src/server/server');
  const server = createServer(assets);
  openServer = server.listen(process.env.PORT || 3210, () => {
    console.log(`Test Server Listening at http://localhost:${process.env.PORT || 3210}`);
    done()
  });
  return openServer
};
const stopLocalServers = (done) => {
  console.log('Closing server...');
  openServer.close(() => {
      done();
      process.exit(0);
  });
};

module.exports = {
  start: startLocalServers,
  stop: stopLocalServers
};
