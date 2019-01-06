const express = require('express');
const http = require('http');
const path = require('path');
const port = process.env.PORT || 3000;
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const app = express();
app.use(express.static(publicPath));
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected!');

    socket.on('createMessage', (message) => {
        console.log('Create Message', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => console.log(`Server is running on ${port}`));

