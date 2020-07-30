const socket = io('/');
const myPeer = new Peer(undefined, {
    host: '/',
    port: '3001'
});
const videoHolder = document.getElementById('videoHolder');

// Setup your-video!
const myVideo = document.createElement('video');
myVideo.muted = true;
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoToStream(myVideo, stream);
}).catch(err => {
    const errHolder = document.getElementById('errorHolder');
    errHolder.style.display = 'block';
    errHolder.textContent = err;
});


//Add video srteam to placeholder Video container
/**
 * 
 * @param {HTMLElement} video 
 * @param {*} stream 
 */
function addVideoToStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.onplay();
    });
    videoHolder.append(video);
}
// socket.emit('join-room', ROOM_ID, 'qwe');