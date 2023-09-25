const path = require('path');
const Config = require('webpack-chain');

const config = new Config();

config.mode('production');

config.entry('umi')
  .add('./src/http.js')
  .end();

config.output
  .path(path.resolve('./.dist'))
  .filename('[name]-test.js')
  .publicPath('/.dist/');

config.optimization.set('chunkIds', 'named');

config.optimization.set('minimize', false);

const conf = config.toConfig();
// console.log(conf);

module.exports = conf;
