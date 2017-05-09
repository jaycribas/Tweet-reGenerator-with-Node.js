import express from 'express'

const router = express()

router.get('/', (req, res) => {
  res.send('GET request to the homepage')
})
