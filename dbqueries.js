var pgp = require('pg-promise')()
var connectionString = 'postgres://localhost:5432/twitter'
var db = pgp(connectionString)

const listTweets = () => {
  return db.any(`
    SELECT
      *
    FROM
      tweets
  `)
}

const saveTweet = ( tweet ) => {
  return db.one(`
    INSERT INTO
      tweets (tweet, id_str)
    VALUES
      ($1, $2)
    RETURNING
      *;
  `,  [ tweet.text, tweet.id_str ] )
}

module.exports = {
  listTweets,
  saveTweet
}
