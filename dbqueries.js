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
      ($/text/, $/id_str/)
    RETURNING
      *
  `, tweet )
}

const randomTweet = () => {
  return db.one(`
    SELECT
      id_str
    FROM
      tweets
    ORDER BY
      RANDOM()
    LIMIT
      1
  `)
}

module.exports = {
  listTweets,
  saveTweet,
  randomTweet
}
