let socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});


socket.on('newMessage', function(message) {
    console.log('newMessage', message);

    let newLi = document.createElement('LI');
    let newContent = document.createTextNode(`${message.from}: ${message.text}`);
    newLi.appendChild(newContent);
    document.querySelector('#messages').append(newLi);
});

document.querySelector('#message-form').addEventListener('submit', function(event) {
    event.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: document.querySelector('[name=message]').value,
    }, function() {

    });
});


