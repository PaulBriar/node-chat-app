let socket = io();

let scrollToBottom = () => {
    //Selectors
    let messages = jQuery('#messages');
    let newMessage = messages.children('li:last-child')
    //Heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMsgHeight = newMessage.innerHeight();
    let lastMsgHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMsgHeight + lastMsgHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
};

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

//Create new message in UI
socket.on('newMessage', (message) => {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#message-template').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime,
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});
//Send geolocation to other user
socket.on('newLocationMessage', (message) => {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url,
    });

    jQuery('#messages').append(html);
    scrollToBottom();
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


