const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const bodyparser = require('body-parser')

let path = __dirname
path = path.substring(0, path.length - 2)

app.post('/logIn',bodyparser.json())

app.post('/logIn', function (req, res, next) {
    console.log(req.body)
})

app.use(express.static(path + '/'))
MongoClient.connect('mongodb://localhost:27017/chatbd', function (err, database) {
    if (err) {
        return console.log(err)
    }
    app.listen(8000, function () {

    })
})

