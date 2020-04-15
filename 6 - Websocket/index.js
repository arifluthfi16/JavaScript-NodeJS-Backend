const express = require('express');
const socket = require('socket.io');

// App Setup

const app = express();
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, ()=>{
  console.log(`Server Listening on PORT ${PORT}`);
});

// Static Files
app.use(express.static('public'))

app.get('/', function(req,res){
  res.render('index.html')
})

// Socket Setup IN THE BACKEND

var io = socket(server);

// When connection made do something
io.on('connection', (socket)=>{
  console.log("Made socket connection ",socket.id);

  // Receive data from the client
  socket.on("chat", function(data){
    // get the data and resend to all client
    io.sockets.emit('chat', data);
  })

  // Listening for for typing 
  socket.on('typing',function(data){
    socket.broadcast.emit('typing',data);
  })
})