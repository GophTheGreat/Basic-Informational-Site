let http = require('http')
const { URL } = require('url');
let fs = require('fs')


http.createServer(function(req, res) {
  let adr = req.url;
  let q = new URL(adr, 'http://localhost:8080');
  let filename = "." + q.pathname;

  fs.readFile(filename, function(err, data) {
    if(err) {
      fs.readFile('404.html', function(err, notFoundPage) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write(notFoundPage);
        return res.end();
      });
    } else {
      // File found, send 200 response with file contents
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    }
  })
}).listen(8080);