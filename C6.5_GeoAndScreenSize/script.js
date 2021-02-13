// ====================== Geolocation ======================

const status = document.querySelector('#status');
const mapLink = document.querySelector('#map-link');
const geoBtn = document.querySelector('.geo-btn');

const error = () => {
    status.textContent = 'Current location is not available';
}

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = 'Link to map';
}

geoBtn.addEventListener('click', () => {
    mapLink.href = '';
    mapLink.textContent = '';

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported in your browser';
    } else {
        status.textContent = 'Finding location...';
        navigator.geolocation.getCurrentPosition(success, error);
    }
});

// ====================== Notification ======================

function notifyMe() {
    // Checking is Notification API in the browser
    if (!("Notification" in window)) {
        console.log("Notification API is not supported");

        // If Notification API and permission granted
    } else if (Notification.permission === "granted") {
        new Notification("Hello!");

        // If Notification API but there is no permission granted
        // then we can request permission
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission()
            .then(function (permission) {
                if (permission === "granted") {
                    var notification = new Notification("Hi there!");
                }
            });
    }
    // If user forbid notifications then notifications can't be shown
}

notifyMe();

// ====================== Screensize ======================

const screensizeBtn = document.querySelector('.screensize-btn');

screensizeBtn.addEventListener('click', () => {
    alert(`Screen width: ${window.screen.width}px, screen height: ${window.screen.height}px`);
    alert(`Browser window width: ${document.documentElement.clientWidth}px, browser window height: ${document.documentElement.clientHeight}px`);
})