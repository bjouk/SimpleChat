var express=require('express')
var SocketIo=require('socket.io')
var app=express()
var server = require('http').Server(app);
var io=SocketIo(server)
var port = process.env.PORT || 8000
var session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
  }),
  sharedsession = require("express-socket.io-session");
app.use(session);
io.use(sharedsession(session))
app.set('view engine','pug')
app.get('/',function(req,res){
	res.render('index.pug')
})
io.on('connection', function(socket){
	socket.on("login", function(userdata) {
        socket.handshake.session.save();
        console.log(userdata)
    });
    socket.on("logout", function(userdata) {
        if (socket.handshake.session.userdata) {
            delete socket.handshake.session.userdata;
            socket.handshake.session.save();
        }
    })
    socket.on('pseudo',function(pseudo){
    	socket.handshake.session.pseudo=pseudo;
    	socket.handshake.session.save();
    })
	socket.on('chat message',function(msg){
		socket.broadcast.emit('chat message',{pseudo:socket.handshake.session.pseudo, message:msg})
		console.log(socket.handshake.session.pseudo,msg)
	})
})

app.use('/static', express.static('public'));
server.listen(port, function(){
  console.log('listening on '+port);
});	
