const webpack = require('webpack');
let server = require('express')();
const axios = require('axios');
const MemeryFS = require('memory-fs');
const fs = require('fs');
const path = require('path');
const send = require('send');
const config = require('../vue.config');
let proxyMiddleware = require('http-proxy-middleware');
const webpackConfig = require('@vue/cli-service/webpack.config');
const {createBundleRenderer} = require('vue-server-renderer');

const compiler = webpack(webpackConfig);

let proxyTable = config.devServer ? config.devServer.proxy || '' : '';

Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context];
  if (typeof options === 'string') {
    options = {target: options};
  }
  server.use(proxyMiddleware(context, options));
});

// handle fallback for HTML5 history API
server.use(require('connect-history-api-fallback')());

const mfs = new MemeryFS();
compiler.outputFileSystem = mfs;

let bundle;
compiler.watch({}, (err, stats) => {
  if (err) throw err;
  stats = stats.toJSON();
  stats.errors.forEach(e => console.error(e));
  stats.warings.forEach(w => console.warn(w));
  const bundlePath = path.join(process.env.BASE_URL,
    'vue-ssr-server-bundle.json');
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));
  console.log('new bundle generated');
});

const handleRequest = (req, res) => {
  if (!bundle) {
    res.end('building....');
  }
  const url = req.url;
  if (url.includes('favicon.ico')) {

  }
};
