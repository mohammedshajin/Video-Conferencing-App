console.log('In main.js!')


var usernameInput = document.querySelector('#username');
var btnJoin = document.querySelector('#btn-join');

var username;
var webSocket;

function webSocketOnMessage(event){
    var parsedData = JSON.parse(event.data);
    var message = parsedData['message'];

    console.log('messgae: ', message);
}

btnJoin.addEventListener('click', () => {
    username = usernameInput.value;

    console.log('username: ', username);

    if(username == ''){
        return;
    }
    usernameInput.value = '';
    usernameInput.disabled = true;
    usernameInput.style.visibilty = 'hidden';

    btnJoin.disabled = true;
    btnJoin.style.visibilty = 'hidden';

    var labelUsername = document.querySelector('#label-username');
    labelUsername.innerHTML = username;

    var loc = window.location;
    var wsStart = 'ws://';

    if(loc.protocol == 'https'){
        wsStart = 'wss://';
    }

    var endPoint = wsStart + loc.host + loc.pathname;

    console.log('endPoint: ', endPoint);

    webSocket = new WebSocket(endPoint);

    webSocket.addEventListener('open', (e) => {
        console.log('connection opened!');

        var jsonStr = JSON.stringify({
            'message': 'This is a message',
        });
        webSocket.send(jsonStr);
    });
    webSocket.addEventListener('message', webSocketOnMessage );
    webSocket.addEventListener('close', (e) => {
        console.log('connection closed!');
    });
    webSocket.addEventListener('error', (e) => {
        console.log('Error occured!');
    });


});

var localStream = new MediaStream();
const constraints = {
    'video': true,
    'audio': true
};

const localVideo = document.querySelector('#local-video')

var userMedia = navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
        localStream = stream;
        localVideo.srcObject = localStream;
        localVideo.muted = true;

    }).catch(ERROR => {
        console.log("ERROR ACCESSING MEDIA DEVICES", error);
    })