const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const users={};
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client.js');
});


io.on('connection',(socket)=>{
  socket.on('new-user-joined', name=>{
    users[socket.id]=name;
    socket.broadcast.emit('user-joined',name)
  })


})
io.on ('connection', (socket) => {
  socket.on('new-user-joined',name =>{
    console.log('new user joined',name);
    users[socket.id] = name;
    socket.broadcast.emit('user-joined',name)
  });

})
io.on('connection', (socket) => {
  console.log('a user connected');             
 socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});


io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});


http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
})