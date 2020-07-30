const socketIo = require('socket.io');

const init =  (server) => {
    const io = socketIo(server);
    io.on('connection', socket => {
        socket.on('join-room', (roomID, userID) => {
            console.log(roomID, userID);
            socket.join(roomID);
            socket.to(roomID).broadcast('user-connected', userID);
            socket.on('disconnect', () => {
                socket.to(roomID).broadcast('user-disconnected', userID);
            });
        });
    })
}

module.exports = {init};