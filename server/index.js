const fs = require('fs');
const path = require('path');
const express = require('express');
const {createBundleRenderer} = require('vue-server-renderer');
const resolve = file => path.resolve(__dirname, file);

const isProd = process.env.NODE_ENV === 'production';

const app = new express();

function createRenderer(bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    runInNewContext: false,
    basedir: resolve('../dist')
  }));
}

let renderer;
let readyPromise;
const templatePath = resolve('../public/index.html');
if (isProd) {
  const template = fs.readFileSync(templatePath, 'utf-8');
  const bundle = require('../dist/vue-ssr-server-bundle');
  const clientManifest = require('../dist/vue-ssr-client-manifest');
  renderer = createBundleRenderer(bundle, {
    template,
    clientManifest
  });
} else {
  readyPromise = require('./dev')(app, templatePath, (bundle, options) => {
    renderer = createRenderer(bundle, options);
  });
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
});

app.use('/dist', serve('../dist', true));
app.use('/public', serve('../public', true));

function render(req, res) {
  res.setHeader('Content-Type', 'text/html');
  const errorHandler = err => {
    if (err.url) {
      res.redirect(err.url);
    } else if (err.code === 404) {
      res.status(404).send('Page Not Found');
    } else {
      res.status(500).send('Internal Server Error');
      console.error(err.stack);
    }
  };

  const context = {
    url: req.url
  };
  renderer.renderToString(context, (err, html) => {
    if (err) return errorHandler(err);
    res.send(html);
  });
}

app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res));
});

app.listen(8080, () => {
  console.log(`server started at 8080`);
});
