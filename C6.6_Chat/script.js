// ====================== Websocket ======================

const wsUri = 'wss://echo.websocket.org/';

const btnSend = document.querySelector('.chat-btn');
const chatInput = document.querySelector('.chat-input');
const messageContainer = document.querySelector('.message-container');
const startMessage = 'Здесь будет история сообщений';
let style = null;

let websocket;

function createMessage(message, style) {
    let msgNode = document.createElement('div');
    msgNode.style.wordWrap = 'break-word';
    msgNode.innerHTML = message;
    msgNode.classList.add('message');
    msgNode.classList.add(style);
    messageContainer.appendChild(msgNode);
}

websocket = new WebSocket(wsUri);
websocket.onopen = function (evt) {
    console.log('CONNECTED');
};
websocket.onclose = function (evt) {
    console.log('DISCONNECTED');
};
websocket.onmessage = function (evt) {
    if (style === 'odd') {
        style = 'even';
        createMessage('Server: ' + evt.data, style);
    }
};
websocket.onerror = function (evt) {
    console.log('ERROR');
};

btnSend.addEventListener('click', () => {
    if (chatInput.value !== '') {
        if (messageContainer.innerText === startMessage) {
            messageContainer.innerText = null;
        }
        const message = chatInput.value;
        chatInput.value = '';
        style = 'odd';
        createMessage('User: ' + message, style);
        websocket.send(message);
    }
});

// ====================== Geolocation ======================

const geoBtn = document.querySelector('.geo-btn');
let href = null;
let textContent = null;

const error = () => {
    textContent = 'Current location is not available';
    createMessage('Geolocation: ' + textContent, style);
}

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    textContent = 'Link to map';
    mapLink = `<a href="${href}" target="_blank">${textContent}</a>`;
    createMessage('Geolocation: ' + mapLink, style);
    websocket.send(mapLink);
}

geoBtn.addEventListener('click', () => {
    style = 'geo';
    if (!navigator.geolocation) {
        textContent = 'Geolocation is not supported in your browser';
    } else {
        textContent = 'Finding location...';
        navigator.geolocation.getCurrentPosition(success, error);
    }
});