let socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});


socket.on('newMessage', (message) => {
    console.log('newMessage', message);

    let newLi = document.createElement('LI');
    let newContent = document.createTextNode(`${message.from}: ${message.text}`);
    newLi.appendChild(newContent);
    document.querySelector('#messages').append(newLi);
});
//Send geolocation to other user
socket.on('newLocationMessage', (message) => {
    let newLi = jQuery('<li></li>');
    let a = jQuery('<a target="_blank">My Location</a>');

    newLi.text(`${message.from}: `);
    a.attr('href', message.url);
    newLi.append(a);
    jQuery('#messages').append(newLi);
});

document.querySelector('#message-form').addEventListener('submit', (event) => {
    event.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: document.querySelector('[name=message]').value,
    }, () => {});
});

let locationButton = document.querySelector('#send-location').addEventListener('click', (event) => {
    if (!navigator.geolocation) {
        return alert('Sorry, your browser does not support geolocation');
    }
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
    }, err => alert('Unable to fetch location'));
});


