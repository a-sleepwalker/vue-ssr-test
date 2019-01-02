const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const MFS = require('memory-fs');
const webpackConfig = require('@vue/cli-service/webpack.config');

const compiler = webpack(webpackConfig);
const mfs = new MFS();
compiler.outputFileSystem = mfs;
const readFile = (fs, file) => {
  try {
    return fs.readFileSync(path.join(webpack.output.path, file), 'utf-8');
  } catch (e) {
  }
};
module.exports = function setDevServer(app, templatePath, cb) {
  let bundle;
  let template;
  let clientManifest;
  let ready;
  const readyPromise = new Promise(resolve => {
    ready = resolve;
  });
  const update = () => {
    if (bundle && clientManifest) {
      ready();
      cb(bundle, template, clientManifest);
    }
  };
  template = fs.readFileSync(templatePath, 'utf-8');

  compiler.watch({}, (err, stats) => {
    if (err) throw err;
    stats = stats.toJson();
    if (stats.error.length) return;
    bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'));
    console.log('new bundle generated');
  });
};
