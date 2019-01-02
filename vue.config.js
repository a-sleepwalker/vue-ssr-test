const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const TARGET_NODE = process.env.WEBPACK_TARGET === 'node';

module.exports = {
  devServer: {
    headers: {'Access-Control-Allow-Origin': '*'}
  },
  configureWebpack: config => {
    return {
      entry: `./src/entry-${TARGET_NODE ? 'server' : 'client'}.js`,
      devtool: 'source-map',
      target: TARGET_NODE ? 'node' : 'web',
      node: TARGET_NODE ? undefined : false,
      output: {
        libraryTarget: TARGET_NODE ? 'commonjs2' : undefined
      },
      externals: TARGET_NODE ? nodeExternals({
        whiteList: [/\.css$/]
      }) : undefined,
      plugins: [
        TARGET_NODE
          ? new VueSSRServerPlugin()
          : new VueSSRClientPlugin()
      ]
    };
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(option => {
        merge(option, {
          optimizeSSR: false
        });
      });
  }
};
