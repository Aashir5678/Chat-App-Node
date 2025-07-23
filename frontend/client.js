const socket = io()
const inputBox = document.getElementById('message-input')
const form = document.querySelector('.input-area')
// const textbox0 = document.querySelector(".text_0");
// const textbox1 = document.querySelector(".text_1");
// const textbox2= document.querySelector(".text_2");
// const textbox3 = document.querySelector(".text_3");
// const textbox4 = document.querySelector(".text_4");
const texts = document.querySelector(".text");
const MessageStacklength = texts.querySelectorAll("li").length;
// const array = [textbox0, textbox1, textbox2, textbox3, textbox4];
const userDisplay = document.querySelector(".user_display");

let username = null
let permissibleUsername = false
let userMessages = []
let filled = false;
let usersOnline = []
activeuser()
function activeuser(){
    // || (usersOnline.length === 1 && usersOnline[0] === username) i am trying to implement something, please dont get rid of this
    if (usersOnline.length === 0){
        userDisplay.innerText = "🟢 only you are active right now";
        console.log("only u");
    }
    else{
        console.log("more");
         userDisplay.innerText = ""
        for(let i = 0; i < usersOnline.length; i++){
           userDisplay.innerText +=  " 🟢 " + usersOnline[i];
        }
    }
}

// function textboxfill(message){  old way, keeping for refference, dont delete
//       if(!(textbox4.innerText.length === 0)){
//         filled = true;
//     }

//     if(filled){
//         for(let i = 0; i < array.length - 1; i++){
//             array[i].innerText = array[i + 1].innerText;
//         }
//         textbox4.innerText = "";
//     }

    
//     for(let i = 0; i < 5; i++){
//         if (array[i].innerText.length === 0){
//             array[i].innerText = message;
//             break
//         }
//     }

function userValidityCheck(username){
    if(username.length >= 25){
        alert("this username is too long");
        return true;
    }
    for(let i = 0; i < usersOnline.length; i++){
        if(usersOnline[i] === username){
            alert("you cant have that username, its taken");
            return true;
        }
    }
    return false;
}
function newMessage(messageAdded){
    // if(MessageStacklength <= 10){
    const message = document.createElement("li");
    message.innerText = messageAdded;
    texts.appendChild(message);
}
form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    if (inputBox.value) {
        if (username == null || !permissibleUsername) {
            if(!userValidityCheck(inputBox.value)){
            socket.emit('username', inputBox.value)
            username = inputBox.value
            usersOnline.push(username)
            userMessages[username] = []
            userDisplay.innerText = "";
            activeuser();
            }
        }

        else {
            if (inputBox.value === "/users") {
                console.log(usersOnline)
            }

            else {
                socket.emit('message', inputBox.value);
                // if(!(textbox4.innerText.length === 0)){
                //     filled = true;
                // }
                let messageUser = username + ': ' + inputBox.value;
                // textboxfill(messageUser);
                newMessage(messageUser);
                console.log("new message");
            }
        }

        inputBox.value = '';
    }
});

socket.on('all messages', messages => {
    userMessages = messages

    // console.log(userMessages);

    for (let i = 0; i < userMessages.length; i++) {
        let message = userMessages[i];
        
        newMessage(message);
        }
})

socket.on('active users', users => {
    usersOnline = users
    permissibleUsername = true

})

socket.on('invalid username', () => {
    alert('Username "' + username + '" already exists.')
})

socket.on('message', message => {
    let user = message['username'];
    userMessages.push(user + ': ' + message['message'])
    console.log(user + ': ' + message['message']);
    let messageThis = user + ': ' + message['message'];
    newMessage(messageThis);

})


socket.on('new connection', user => {
    // activeUsers[user] = true
    userMessages[user] = [];
    console.log(usersOnline);
    usersOnline.push(user);
    userDisplay.innerText = ""
    activeuser()

    console.log('New connection: ' + user);
    messageNewUser = 'New connection: ' + user
    
    
})

socket.on('leave', user => {
    console.log(user + " has disconnected.");
    usersOnline.splice(usersOnline.indexOf(user), 1)
    messageLeft = user + " has disconnected."
    newMessage(messageLeft);
    userDisplay.innerText = ""
    activeuser()
    delete userMessages[user];
})
