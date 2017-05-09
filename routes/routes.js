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

/* SEARCH */
// let params = {
//   q: 'banana since:2011-11-11',
//   count: 2
// }
//
// router.get('/', (req, res) => {
//   client.get('search/tweets', params)
//   .then ( data => {
//     res.render('index', { twitter: data })
//   })
// })

// router.post('/tweet', (req, res) => {
//   db.saveTweet( req.body.twit )
//   .then( response => {
//     console.log("(╯°□°）╯︵ ┻━┻", response)
//     client.post('statuses/update', { status: response.tweet } )
//   })
//   .then (() => {
//     res.redirect('/')
//   })
//   .catch(error => {
//     res.status(500).render('error', {
//       error: error,
//       message: error.message,
//   })
// })
// })

router.post('/tweet', (req, res) => {
  client.post('statuses/update', { status: req.body.twit })
  .then( response => {
    // console.log("(╯°□°）╯︵ ┻━┻", response)
    db.saveTweet( response.text )
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

module.exports = {
  router,
  client
}
