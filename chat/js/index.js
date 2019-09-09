const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const bodyparser = require('body-parser')
const helper = require('./helper')
const storage = require('localStorage')
const request = require('request')
const async = require('async')
const await = require('await')

let db
let path = __dirname
path = path.substring(0, path.length - 2)

app.post('/logIn', bodyparser.json())
app.post('/logIn', async function (req, res, next) {

    let value = JSON.stringify(await helper.auth(req.body, db, res))
    res.send(value)

})

app.post('/signUp', bodyparser.json())
app.post('/signUp', async function (req, res, next) {
    let user = helper.reg(req.body, db, res)
    await storage.get({
        key: await helper.auth(user, db, res)
    })

    console.log(storage.key)

})

app.use(express.static(path + '/'))
MongoClient.connect('mongodb://localhost:27017/chatbd', function (err, database) {
    if (err) {
        return console.log(err)
    }

    db = database.db('users')

    app.listen(8000, function () {

    })
})

