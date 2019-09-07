const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const bodyparser = require('body-parser')
const helper = require('./helper')
const storage = require('local-storage')
const request = require('request')

let db
let path = __dirname
path = path.substring(0, path.length - 2)

app.post('/logIn', bodyparser.json())
app.post('/logIn', function (req, res, next) {
    storage.get({
        key: helper.auth(req.body, db, res)
    })
})

app.post('/signUp', bodyparser.json())
app.post('/signUp', function (req, res, next) {
    let user = helper.reg(req.body, db, res)
    storage.get({
        key: helper.auth(user, db, res)
    })

    console.log(storage.key)

})

app.use(express.static(path + '/'))
MongoClient.connect('mongodb://localhost:27017/chatbd', function (err, database) {
    if (err) {
        return console.log(err)
    }

    db = database.db('users');

    app.listen(8000, function () {

    })

})

