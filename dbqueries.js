var pgp = require('pg-promise')()
var connectionString = 'postgres://localhost:5432/twitter'
var db = pgp(connectionString)

/*--- View all stored tweets ---*/
const listTweets = () => {
  return db.any(`
    SELECT
      *
    FROM
      tweets
  `)
}

/*--- Save new tweet into stored tweets ---*/
const saveTweet = ( tweet ) => {
  return db.one(`
    INSERT INTO
      tweets (tweet)
    VALUES
      ($/tweet/)
    RETURNING
      *
  `, tweet )
}

/*--- Randomly select one stored tweet ---*/
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
