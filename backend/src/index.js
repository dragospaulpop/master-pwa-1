const express = require('express')
const fs = require('fs-extra')
const path = require("path")
const uniqid = require("uniqid")
const bodyParser = require("body-parser")
const app = express()
const cors = require('cors')
const { Console } = require('console')
const port = 3000

app.use(cors())
app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/todos', (req, res) => {
  const filepath = path.join(__dirname, "../db/index.json")
  const todos = fs.readJSONSync(filepath)
  res.send(todos)
})

app.post('/todos', (req, res) => {
  const filepath = path.join(__dirname, "../db/index.json")
  const todos = fs.readJSONSync(filepath)
  todos.push({
    id: uniqid(),
    title: req.body.title,
    done: false
  })
  fs.writeJSONSync(filepath, todos)
  res.send(todos.pop())
})

app.delete('/todos/:id',(req, res)=>{
  const filepath = path.join(__dirname, "../db/index.json")
  const todos = fs.readJSONSync(filepath)
  const filter = todos.filter(todo => todo.id!=req.params.id)
  fs.writeJSONSync(filepath, filter)
  res.send({message:`todo ${req.params.id} removed succesfully`})
} )

app.listen(port, () => {
  console.log(`Our example app listening on port ${port}`)
})

