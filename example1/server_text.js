var http = require('http');
http.createServer(function(req,res){
   res.writeHead(404,{"Content-Type":"text/plain"});
   res.end("Test webserver - Text");
}).listen(3333);