var http = require('http');
var fs = require('fs');

http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type":"text/html"});
//c1
    // var index_html = fs.readFileSync(__dirname+"/index.html","utf-8");
    // index_html = index_html.replace("{NAME}","Đồng Nhật");
    // res.end(index_html);

 //c2
    fs.createReadStream(__dirname+"/index.html","utf-8").pipe(res);
}).listen(3333);