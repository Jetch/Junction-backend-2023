require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
//const cors = require('cors')

const port = process.env.PORT

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const unknownEndpoint = (request, response) => {
response.status(404).send({ error: 'unknown endpoint' })
}

//app.use(cors())
app.use(express.static('dist')) 
app.use(express.json())
app.use(requestLogger)



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/motion', (request, response) => {
    response.json()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})