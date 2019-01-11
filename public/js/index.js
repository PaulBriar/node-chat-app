let socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

//Create new message in UI
socket.on('newMessage', (message) => {
    let formattedTime = moment(message.createdAt).format('h:mm a');

    let newLi = document.createElement('LI');
    let newContent = document.createTextNode(`${message.from} ${formattedTime}: ${message.text}`);
    newLi.appendChild(newContent);
    document.querySelector('#messages').append(newLi);
});
//Send geolocation to other user
socket.on('newLocationMessage', (message) => {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let newLi = jQuery('<li></li>');
    let a = jQuery('<a target="_blank">My Location</a>');

    newLi.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    newLi.append(a);
    jQuery('#messages').append(newLi);
});

document.querySelector('#message-form').addEventListener('submit', (event) => {
    event.preventDefault();

    let messageTextBox = document.querySelector('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.value,
    }, () => {
        messageTextBox.value = '';
    });
});

let locationButton = document.querySelector('#send-location');

let sendLoc = () => {
    locationButton.innerHTML = 'Send location';
}

locationButton.addEventListener('click', (event) => {
    if (!navigator.geolocation) {
        return alert('Sorry, your browser does not support geolocation');
    }

    locationButton.setAttribute('disabled', 'disabled');
    locationButton.innerHTML = 'Sending location...';

    navigator.geolocation.getCurrentPosition((position) => {
        locationButton.removeAttribute('disabled');
        sendLoc();
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
    }, err => {
        locationButton.removeAttribute('disabled');
        sendLoc();
        alert('Unable to fetch location');
    });
});


