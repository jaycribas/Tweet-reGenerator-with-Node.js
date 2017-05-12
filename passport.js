const TwitterStrategy = require('passport-twitter')
require('dotenv').load()

const User = {
  findOrCreate: (info, callback) => {
    callback(null, info)
  }
}

const strategy = new TwitterStrategy({
  consumerKey: process.env.API_KEY,
  consumerSecret: process.env.API_SECRET,
  callbackURL: 'http://localhost:3000/auth/twitter/callback'
},
function(token, tokenSecret, profile, done) {
  User.findOrCreate({ displayname: 'jaycribas' }, function(err, user){
    if (err) return done(err)
    done(null, user)
    })
  }
)

module.exports = { strategy }
