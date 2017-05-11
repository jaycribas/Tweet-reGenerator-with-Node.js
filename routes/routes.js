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

/*--- New tweet posts to Twitter and database ---*/
router.post('/tweet', (req, res) => {
  console.log(req.body.twit)
  db.saveTweet( req.body )
  // const autoConsole = () => {
  //   let r = Math.floor(Math.random()*100)
  //   client.post('statuses/update', { status: req.body.twit + ' ' + r })
  // }
  // setInterval(autoConsole, 1000*60)
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

/*--- Retweet posts from Twitter ---*/
router.post('/retweet/:id_str', (req, res) => {
  client.post('statuses/retweet/' + req.params.id_str, { id: req.params.id_str })
  .then( () => {
    res.redirect('back')
  })
  .catch( error => {
    console.log( error )
    res.sendStatus(400)
  })
})

/*--- Retweet posts from stored tweets ---*/
router.post('/dbretweet/:id_str', (req, res) => {
  console.log("req (╯°□°）╯︵ ┻━┻", req.params)
  client.post('statuses/retweet/' + req.params.id_str, { id: req.params.id_str })
  .then( () => {
    res.redirect(req.get('referer'))
  })
  .catch( error => {
    console.log( error )
    res.sendStatus(400)
  })
})


// const tweeter = () => {
//   db.randomTweet()
//   .then ( random => {
//     console.log("RANDOM (╯°□°）╯︵ ┻━┻", random)
//     client.post('statuses/retweet/' + random.id_str, { id: random.id_str })
//   })
//   .catch( error => {
//     console.log('error---->', error )
//     res.sendStatus(400)
//   })
// }
//
// tweeter();
//
// setInterval(tweeter, 1000*60)

module.exports = {
  router,
  client
}
