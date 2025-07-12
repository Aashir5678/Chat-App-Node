

// DISABLE FIREWALL FOR PRIVATE NETWORKS

const socket = io()

const inputBox = document.getElementById('message-input')
const form = document.getElementById('send-button')
const textbox0 = document.querySelector(".text_0");
const textbox1 = document.querySelector(".text_1");
const textbox2= document.querySelector(".text_2");
const textbox3 = document.querySelector(".text_3");
const textbox4 = document.querySelector(".text_4");
const array = [textbox0, textbox1, textbox2, textbox3, textbox4]

let username = null
let userMessages = {}

// 'click', form
form.addEventListener("click", function(){
    // e.preventDefault();
    if (inputBox.value) {
        if (username == null) {
            socket.emit('username', inputBox.value)

            username = inputBox.value
            userMessages[username] = []
        }

        else {
            socket.emit('message', inputBox.value)
            
            for(let i = 0; i < 5; i++){
                if (array[i].innerText.length === 0){
                    console.log("working-here");
                    array[i].innerText = username + ': ' + inputBox.value;
                    break
                }
            }
            console.log(username + ': ' + inputBox.value);
        }

        inputBox.value = ''
    }
});

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

