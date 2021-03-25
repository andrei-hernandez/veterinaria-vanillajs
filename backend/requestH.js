const StringDecoder = require('string_decoder').StringDecoder;
const router = require('./router');
const url = require('url');

module.exports = (req, res) => {
  const actuaURL = req.url;
  const parsedURL = url.parse(actuaURL, true);
  const route = parsedURL.pathname;

  const cleanRoute = route.replace(/^\/+|\/+$/g, '');

  const method = req.method;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Methods", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const { query = {} } = parsedURL;

  const { headers = {} } = req;

  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', (data) => {
    buffer += decoder.write(data);
  });
  req.on('end', (data) => {
    buffer += decoder.end();

    if (headers["content-type"] === 'application/json') {
      buffer = JSON.parse(buffer);
    }
    if (cleanRoute.indexOf('/') > -1) {
      var [mainRoute, indice] = cleanRoute.split('/');
    }

    var data = {
      indice,
      route: mainRoute || cleanRoute,
      query,
      method,
      headers,
      payload: buffer
    };

    console.log({ data });

    let handler;
    if (data.route && router[data.route] && router[data.route][method]) {
      handler = router[data.route][method];
    } else {
      handler = router.notFound;
    }

    if (typeof handler === 'function') {
      handler(data, (status = 200, message) => {
        const response = JSON.stringify(message);
        res.setHeader("Content-Type", "application/json");
        res.writeHead(status);
        res.end(response);
      });
    }
  });
};