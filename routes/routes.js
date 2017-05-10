import express from 'express'
import Twitter from 'twitter'
require('dotenv').config()
import db from '../dbqueries'

const router = express()

const client = new Twitter({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

router.get('/', (req, res) => {
  db.listTweets()
  .then ( data => {
    res.render( 'index', { tweets: data })
  })
  .catch( error => {
    console.log( error )
    res.sendStatus(400)
  })
})

router.post('/tweet', (req, res) => {
  client.post('statuses/update', { status: req.body.twit })
  .then( response => {
    db.saveTweet( response )
  })
  .then (() => {
    res.redirect('/')
  })
  .catch(error => {
    console.log("ERROR (╯°□°）╯︵ ┻━┻", error)
    res.status(500).render('error', {
      error: error,
      message: error.message,
  })
  })
})

router.post('/retweet/:id_str', (req, res) => {
  client.post('statuses/retweet/' + req.params.id_str, { id: req.params.id_str })
  .then( () => {
    res.redirect('/')
  })
  .catch( error => {
    console.log( error )
    res.sendStatus(400)
  })
})

const tweeter = () => {
  db.randomTweet()
  .then ( random => {
    client.post('statuses/retweet/' + random.id_str, { id: random.id_str })
  })
  .then( () => {
    res.redirect('/')
  })
  .catch( error => {
    console.log( error )
    res.sendStatus(400)
  })
}

tweeter();

setInterval(tweeter, 1000*20)

module.exports = {
  router,
  client
}
