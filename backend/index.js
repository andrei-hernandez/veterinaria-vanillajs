const http = require('http');
const requestH = require('./requestH');
const recursos = require('./recursos');

const server = http.createServer(requestH);

server.listen(8000, () => {
  console.log('the server is runing on port 8000');
});