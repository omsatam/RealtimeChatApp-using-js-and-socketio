// node server which will handle socket io connections
const io = require('socket.io')
const users = {};
io.on('connection', socket => {
    socket.on('new-user-joined', name =>{
        users[socket.id] = name;
        console.log(`user joined ${users[socket.id]}`)
   
    socket.broadcast.emit('user-joined', name);    
    });


socket.on('send',message =>{ 
    socket.broadcast.emit('recieve',{name: users[socket.id], message:message})
});

socket.on('disconnect', message =>{
    socket.broadcast.emit('left', users[socket.id]); 
    delete users[socket.id];
});
})
