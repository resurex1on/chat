var http = require('http');
var fs = require('fs')

var server = http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    let path = __dirname
    path = path.substring(0, path.length-3)
    var myReadStream = fs.createReadStream(path + '/index.html', 'utf8');
    myReadStream.pipe(response);
  });
  
  server.listen(3000, '127.0.0.1');
