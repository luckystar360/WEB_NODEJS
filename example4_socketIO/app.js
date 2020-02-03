var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io=require("socket.io")(http);

app.use(express.static('public'));

app.get("/group",function(req,res){
    //res.send("aghihi");
    res.sendFile("index.html",{root:__dirname + '/public'})
});

//route
app.get("/admin.aspx",function(req,res){
    res.send("Đây là trang admin");
});

//socketIO
io.on("connection",function(socket){
    console.log("User Connection: "+socket.id);
    socket.on("disconnect",function(){
        console.log("User disconnection: "+socket.id);
    });
    socket.on("chat message",function(msg){
        console.log(socket.id + ": " + msg)
        socket.broadcast.emit("return message",msg,socket.id);
    });
});

//get parameters
app.get("/getparam/:num1/:num2",function(req,res){
    var num1 = req.params.num1;
    var num2 = req.params.num2;
    res.send("PARAM:" + num1 + " " + num2)
});

http.listen(3000,function(){
    console.log("listening on: 3000");
});
