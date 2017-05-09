import express from 'express'
import bodyParser from 'body-parser'

const server = express()

server.use(bodyParser.urlencoded({extended:true}))
server.set('view engine', 'pug')
server.use(express.static(__dirname + '/public'))

server.get('/', (req, res) => {
  res.render('index')
})


server.listen(3000)
console.log('Server 3000 listening...')

module.exports = { server }
