const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors())

app.use(express.static('public'))

app.get('/todos', (req, res) => {
  res.send([
    { value: 'Todo 1', done: true },
    { value: 'Todo 2', done: false }
  ])
})

app.listen(port, () => {
  console.log(`Our example app listening on port ${port}`)
})