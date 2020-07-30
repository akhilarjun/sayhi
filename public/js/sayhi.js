const socket = io('/');
const myPeer = new Peer();
const videoHolder = document.getElementById('videoHolder');
const peers = {};

// Setup your-video!
const myVideo = document.createElement('video');
myVideo.muted = true;
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoToStream(myVideo, stream);

    socket.on('user-connected', userID => {
        connectToNewUser(userID, stream);
    });

    myPeer.on('call', call => {
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
            addVideoToStream(video, userVideoStream);
        });
    });
}).catch(err => {
    console.error(err);
});

//Disconnect call when user leaves
socket.on('user-disconnected', userID => {
    peers[userID] ? peers[userID].close() : true;
});

//once my-peer is created
myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
});

//connect user to on going call
function connectToNewUser(userID, stream) {
    const call = myPeer.call(userID, stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
        addVideoToStream(video, userVideoStream);
    });
    call.on('close', () => {
        video.remove();
    });
    peers[userID] = call;
}


//Add video srteam to placeholder Video container
/**
 * 
 * @param {HTMLElement} video 
 * @param {*} stream 
 */
function addVideoToStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    videoHolder.append(video);
}