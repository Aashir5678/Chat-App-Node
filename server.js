

// DISABLE FIREWALL FOR PRIVATE NETWORKS


const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io') 
const io = new Server(server)
const port = 3000
let users = {}
let userMessages = {}

app.use(express.static(__dirname + '/frontend'))


io.on('connection', socket => {
    socket.emit('all messages', userMessages)
    
    socket.on('disconnect', () => {
        if (socket.id in users) {
            socket.broadcast.emit('leave', users[socket.id])
            console.log(users[socket.id] + " has disconnected.")
            delete userMessages[users[socket.id]]
            delete users[socket.id]

        }

        else {
            socket.broadcast.emit('message', "Unknown user has disconnected.")
            console.log("Unknown user has disconnected.")
        }
        
    })

    socket.on('message', mes => {
        console.log(users[socket.id] + ": " + mes)
        
        let message_obj = {'username': users[socket.id], 'message': mes}
        socket.broadcast.emit('message', message_obj)

        userMessages[users[socket.id]].push(mes)
    })

    socket.on('username', username => {
        console.log('New connection: ' + username)
        socket.broadcast.emit('new connection', username)
        users[socket.id] = username
        userMessages[username] = [];
    })
})

server.listen(port, () => {
    console.log('listening on http://localhost:3000...')
})
