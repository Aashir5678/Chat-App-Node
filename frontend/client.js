const socket = io()
const inputBox = document.getElementById('message-input')
const form = document.getElementById('send-button')
const textbox0 = document.querySelector(".text_0");
const textbox1 = document.querySelector(".text_1");
const textbox2= document.querySelector(".text_2");
const textbox3 = document.querySelector(".text_3");
const textbox4 = document.querySelector(".text_4");
const array = [textbox0, textbox1, textbox2, textbox3, textbox4];
const userDisplay = document.querySelector(".user_display")

let username = null
let permissibleUsername = false
let userMessages = []
let filled = false;
let usersOnline = []
activeuser()

function activeuser(){
    if (usersOnline.length === 0 || usersOnline.length === 1){
        userDisplay.innerText = "🟢 only you are active right now";
        console.log("only u");
    }
    else{
        console.log("more");
        for(let i = 0; i < usersOnline.length; i++){
           userDisplay.innerText =  "🟢" + usersOnline[i];
        }
    }
}

form.addEventListener("click", function(){
    // e.preventDefault();
    if (inputBox.value) {
        if (username == null || !permissibleUsername) {
            socket.emit('username', inputBox.value)
            username = inputBox.value
            usersOnline.push[username]
            userMessages[username] = []
        }

        else {
            if (inputBox.value === "/users") {
                console.log(usersOnline)
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
        }

        inputBox.value = '';
    }
});

socket.on('all messages', messages => {
    userMessages = messages

    // console.log(userMessages);

    for (let i = 0; i < userMessages.length; i++) {
        let message = userMessages[i]

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
                array[i].innerText = message;
                break
            }
        }
    }
})

socket.on('active users', users => {
    usersOnline = users
    permissibleUsername = true

    activeuser()
})

socket.on('invalid username', () => {
    alert('Username "' + username + '" already exists.')
    activeuser()
})

//hello gautam
socket.on('message', message => {
    let user = message['username'];
    activeuser()
    userMessages.push(user + ': ' + message['message'])
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
    // activeUsers[user] = true
    userMessages[user] = [];
    console.log(usersOnline);
    usersOnline.push(user);
    activeuser()
    activeuser()

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
    usersOnline.splice(usersOnline.indexOf(user), 1)

    activeuser()
    // activeUsers[user] = false
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
