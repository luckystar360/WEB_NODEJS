var express = require('express')
var app = express()
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views','./view');

// decleare variable
var listAccount=[];

// render ejs file
app.get('/', function (req, res) {
  res.render('index');
});

//event socket.io
io.on("connection",function(socket){
    console.log("có kết nối - id:" + socket.id)
    socket.on("client-send-account",function(data){
      if(listAccount.indexOf(data)>-1) //check account in list
      {
        socket.emit("client-register-fail",data);
        console.log("failed to add user: "+data)        
      }
      else
      {
        listAccount.push(data);
        socket.Name = data; //add property for socket
        socket.emit("client-register-success",data);
        io.sockets.emit("update-list-account",listAccount);
        console.log("added user: " + data);
      }
    });

    socket.on("disconnect",function(){
      if(listAccount.indexOf(socket.Name)>-1)
        listAccount.splice(listAccount.indexOf(socket.Name),1);
      io.sockets.emit("update-list-account",listAccount);
    });

    socket.on("client-send-message",function(data){
      var json_mess = {name:socket.Name,mess:data}
      io.sockets.emit("update-message",json_mess)
      console.log("mess:" + data);
    });

    socket.on("client-log-out",function(){
      console.log("logout")
      if(listAccount.indexOf(socket.Name)>-1)
        listAccount.splice(listAccount.indexOf(socket.Name),1);
      io.sockets.emit("update-list-account",listAccount);
    });
});


http.listen(3000,function(){
    console.log("listening on: 3000");
});
