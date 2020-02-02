var http = require('http');
var fs = require('fs');

http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type":"text/html"});
    var obj = {
        ho : "Dong",
        ten: "Nhat",
        nam_sinh: 1995
    };
    res.end(JSON.stringify(obj));
}).listen(3333);