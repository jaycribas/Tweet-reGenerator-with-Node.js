import express from 'express'
import Twitter from 'twitter'
require('dotenv').config()

const router = express()

const client = new Twitter({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

let params = {
  q: 'banana since:2011-11-11',
  count: 2
}

router.get('/', (req, res) => {
  client.get('search/tweets', params)
  .then ( data => {
    res.render('index', { twitter: data })
  })
})

router.post('/tweet', (req,res) => {
  client.post('statuses/update', { status: req.body.twit })
  .then ( tweet => {
    console.log(tweet)
    res.status(201)
    res.redirect('/')
  })
  .catch( error => {
    res.sendStatus(400)
  })
})

module.exports = {
  router,
  client
}
