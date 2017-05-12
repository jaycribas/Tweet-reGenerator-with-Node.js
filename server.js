import express from 'express'
import bodyParser from 'body-parser'
import passport from 'passport'
import { router } from './routes/routes'
const session = require('express-session')

const server = express()

server.use(bodyParser.urlencoded({extended:true}))
server.set('view engine', 'pug')
server.use(express.static(__dirname + '/public'))

server.use(session({
   secret: 'keyboard cat'
}))

server.use(passport.initialize())
passport.serializeUser(function(user, callback) {
  callback(null, user);
})
passport.deserializeUser(function(obj, callback) {
  callback(null, obj);
})

server.use(router)

server.get('/', (req, res) => {
  res.render('index')
})

server.listen(3000)
console.log('Server 3000 listening...')
