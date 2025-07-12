

// DISABLE FIREWALL FOR PRIVATE NETWORKS

const socket = io()

const inputBox = document.getElementById('message-input')
const form = document.getElementById('send-button')
const textbox0 = document.querySelector(".text_0");
const textbox1 = document.querySelector(".text_1");
const textbox2= document.querySelector(".text_2");
const textbox3 = document.querySelector(".text_3");
const textbox4 = document.querySelector(".text_4");
const array = [textbox0, textbox1, textbox2, textbox3, textbox4];

let username = null
let userMessages = {}
let filled = false;

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
            if(!(textbox4.innerText.length === 0)){
                filled = true;
            }
            if(filled){
                 for(let i = 0; i < array.length - 1; i++){
                    array[i].innerText = array[i + 1].innerText;
                }
                textbox4.innerText = "";
            }
            for(let i = 0; i < array.length; i++){
                if (array[i].innerText.length === 0){
                    array[i].innerText = username + ': ' + inputBox.value;
                    break;
                }
            }
            console.log(username + ': ' + inputBox.value);
        }

        inputBox.value = '';
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
     if(!(textbox4.innerText.length === 0)){
                filled = true;
            }
            if(filled){
                 for(let i = 0; i < array.length - 1; i++){
                    array[i].innerText = array[i + 1].innerText;
                }
                textbox4.innerText = "";
    }
    for(let i = 0; i < 5; i++){
                if (array[i].innerText.length === 0){
                    array[i].innerText = user + ': ' + message['message'];
                    break
                }
            }
    
})

socket.on('new connection', user => {
    userMessages[user] = [];
    console.log('New connection: ' + user);
      if(!(textbox4.innerText.length === 0)){
                filled = true;
            }
            if(filled){
                 for(let i = 0; i < array.length - 1; i++){
                    array[i].innerText = array[i + 1].innerText;
                }
                textbox4.innerText = "";
    }
    for(let i = 0; i < 5; i++){
                if (array[i].innerText.length === 0){
                    console.log("working-here");
                    array[i].innerText = 'New connection: ' + user;
                    break
                }
            }
})

socket.on('leave', user => {
    console.log(user + " has disconnected.");
          if(!(textbox4.innerText.length === 0)){
                filled = true;
            }
            if(filled){
                 for(let i = 0; i < array.length - 1; i++){
                    array[i].innerText = array[i + 1].innerText;
                }
                textbox4.innerText = "";
    }
    for(let i = 0; i < 5; i++){
                if (array[i].innerText.length === 0){
                    console.log("working-here");
                    array[i].innerText = user + " has disconnected.";
                    break
                }
            }
    delete userMessages[user];
})

