var exports = module.exports = {};

exports.startServer = function() {

  var http = require('http');
  var server = http.createServer(function(request, response) {
    response.writeHead(404);
    response.end();
  });

  server.listen('9999', function() {
      console.log((new Date()) + ' Server is listening on port 9999');
  });

  return server;

};
