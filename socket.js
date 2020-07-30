const socketIo = require('socket.io');

const init =  (server) => {
    const io = socketIo(server);
    io.on('connection', socket => {
        socket.on('join-room', (roomID, userID) => {
            console.log(roomID, userID);
        });
    })
}

module.exports = {init};