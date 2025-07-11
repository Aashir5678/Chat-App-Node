

// DISABLE FIREWALL FOR PRIVATE NETWORKS

const socket = io()

const inputBox = document.getElementById('message-input')
const form = document.getElementById('send-button')
const textbox = document.querySelector(".text_1");

let username = null
let userMessages = {}



form.addEventListener('click', (e) => {
    e.preventDefault();
    if (inputBox.value) {
        if (username == null) {
            socket.emit('username', inputBox.value)

            username = inputBox.value
            userMessages[username] = []
        }

        else {
            socket.emit('message', inputBox.value)
             textbox.innerText = username + ': ' + inputBox.value;
             console.log(username + ': ' + inputBox.value);
        }

        inputBox.value = ''
        

    }
})

socket.on('all messages', messages => {
    userMessages = messages;
    console.log(messages);
})

socket.on('message', message => {
    let user = message['username'];
    
    userMessages[user].push(message['message']);
    console.log(user + ': ' + message['message']);
    textbox.innerText = user + ': ' + message['message'];
})

socket.on('new connection', user => {
    userMessages[user] = [];
    console.log('New connection: ' + user);
    alert('New connection: ' + user);
})

socket.on('leave', user => {
    console.log(user + " has disconnected.");
    alert(user + " has disconnected.");
    delete userMessages[user];
})

