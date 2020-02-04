var express = require("express");
var app = express();
var server = require("http").createServer(app);
server.listen(3333);

app.get("/",function(req,res){
    //res.send("aghihi");
    res.sendFile(__dirname+"/index.html")
});

//route
app.get("/admin.aspx",function(req,res){
    res.send("Đây là trang admin");
});

//get parameters
app.get("/getparam/:num1/:num2",function(req,res){
    var num1 = req.params.num1;
    var num2 = req.params.num2;
    res.send("PARAM:" + num1 + " " + num2)
})