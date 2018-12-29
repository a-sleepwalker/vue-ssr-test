const server = require('express')();
const {createBundleRenderer} = require('vue-server-renderer');
const template = require('fs').readFileSync('../public/index.html', 'utf-8');
const serverBundle = require('../dist/vue-ssr-server-bundle');
const clientManifest = undefined;

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest
});

server.get('*', (req, res) => {
  const context = {
    url: req.url,
    title: 'hello'
  };
  renderer.renderToString(context, (err, html) => {
    if (err) {
      let errMsg = '';
      switch (err.code) {
        case 404:
          errMsg = 'Page not found';
          break;
        case 500:
          errMsg = 'Internal Server Error';
          break;
        default:
          errMsg = `${err.code} ${err.message}`;
          break;
      }
      res.status(err.code || 500).end(errMsg + ' --SSR');
    } else {
      res.end(html);
    }
  });
});

server.listen(8080);
