require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: "*"}})
const cors = require('cors')

const port = process.env.PORT

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

let channel = {}

app.use(cors())
app.use(express.static('dist')) 
app.use(express.json())
app.use(requestLogger)

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('motion', (data) => {
    console.log(data)
    io.emit('motion', data)
    io.emit(String(data.channel, data))
  })
  
  socket.on('message', (message) => {
    console.log(message)
    io.emit('message', `${socket.id.substr(0,2)} said ${message}`)
  })
  socket.on('disconnect', function () {
    console.log('user disconnected')
  });
})

app.get('/channel', (request, response) => {
  let number = Math.floor(Math.random() * 1000000);
  while (!channel[number]) {
    number = Math.floor(Math.random() * 1000000);
  }
  channel[number] = number
  response.json(String(number))
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})