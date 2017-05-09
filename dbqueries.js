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
      tweets (tweet)
    VALUES
      ($1)
    RETURNING
      *
  `, [tweet] )
}

module.exports = {
  listTweets,
  saveTweet
}
