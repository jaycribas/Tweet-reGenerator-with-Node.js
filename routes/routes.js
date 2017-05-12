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

/*--- Index page of user timeline from Twitter ---*/
router.get('/', (req, res) => {
  client.get('statuses/user_timeline', {screen_name: 'jaycribas', count: 200})
  .then ( data => {
    res.render( 'index', { tweets: data })
  })
  .catch( error => {
    console.log( error )
    res.sendStatus(400)
  })
})

/*--- Stored Tweets page from database ---*/
router.get('/stored-tweets', (req, res) => {
  db.listTweets()
  .then ( data => {
    res.render( 'stored-tweets', { tweets: data })
  })
  .catch( error => {
    console.log( error )
    res.sendStatus(400)
  })
})

/*--- New tweet posts to Twitter at interval and database ---*/
router.post('/tweet', (req, res) => {
  client.post('statuses/update', { status: req.body.twit })
  .then( response => {
    db.saveTweet( req.body )
    const autoTweet = () => {
      let r = Math.floor(Math.random()*100)
      client.post('statuses/update', { status: req.body.twit + ' ' + r })
    }
    setInterval(autoTweet, parseInt(req.body.frequency))
  })
  .then (() => {
    res.redirect('/')
  })
  .catch(error => {
    res.status(500).render('error', {
      error: error,
      message: error.message,
  })
})
})

router.post('/deleteTweet/:id', (req, res) => {
  db.deleteTweet(req.params.id)
  .then(() => {
    res.redirect('back')
  })
  .catch(error => {
    res.status(500).render('error', {
      error: error,
      message: error.message,
  })
  })
})

module.exports = {
  router,
  client
}
