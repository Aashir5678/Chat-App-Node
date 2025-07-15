

// DISABLE FIREWALL FOR PRIVATE NETWORKS


const express = require('express')
const app = express()
const mongoose = require('mongoose')
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

const db_pass = process.env.db_pass
const db_username = process.env.db_user
const db_uri = 'mongodb+srv:// ' + db_username + ':' + db_pass + '@messages.bzi197g.mongodb.net/?retryWrites=true&w=majority&appName=Messages'
const port = 3000
let users = {}
let activeUsers = {} // key: username, pair: boolean connected
let orderedMessages = []

app.use(express.static(__dirname + '/frontend'))


async function connect() {
    await mongoose.connect(db_uri)
    console.log('connevted')

    const allMessages = await userMessage.find()

    // console.log(typeof(allMessages))
    for (let i =0; i < allMessages.length; i++) {
        orderedMessages.push(allMessages[i]['user'] + ': ' + allMessages[i]['message'])
    }
}

connect().then(() => {console.log(orderedMessages)})

const userMessageSchema = new mongoose.Schema({user: String, message: String})
const userMessage = mongoose.model('userMessage', userMessageSchema)


io.on('connection', socket => {
    socket.emit('all messages', orderedMessages)
    socket.on('disconnect', () => {
        if (socket.id in users) {
            activeUsers[users[socket.id]] = false
            socket.broadcast.emit('leave', users[socket.id])
            console.log(users[socket.id] + " has disconnected.")
            delete users[socket.id]

        }

        else {
            socket.broadcast.emit('message', "Unknown user has disconnected.")
            console.log("Unknown user has disconnected.")
        }
        
    })

    socket.on('message', mes => {
        let username = users[socket.id]
        console.log(username + ": " + mes)
        
        let message_obj = {'username': username, 'message': mes}
        socket.broadcast.emit('message', message_obj)

        orderedMessages.push(username + ': ' + mes)

        let message = new userMessage({user: username, message: mes})
        console.log(message.user)
        message.save().then((res) => {console.log(res)}).catch((err) => {console.log(err)})

    })

    socket.on('username', username => {
        activeUsers[username] = true
        console.log('New connection: ' + username)
        socket.broadcast.emit('new connection', username)

        socket.emit('active users', activeUsers)
        users[socket.id] = username



    })
})

server.listen(port, () => {
    console.log('listening on http://localhost:3000...')
})
