const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const bodyparser = require('body-parser')
const helper = require('./helper')
const storage = require('localStorage')
const request = require('request')
const async = require('async')
const await = require('await')

let dbUsers
let dbMessage
let dbChats
let dbInvite
let dbReq
let dbFriends

let path = __dirname
path = path.substring(0, path.length - 2)

app.post('/logIn', bodyparser.json())
app.post('/logIn', async function (req, res, next) {

    let value = JSON.stringify(await helper.auth(req.body, dbUsers, res))
    res.send(value)

})

app.post('/signUp', bodyparser.json())
app.post('/signUp', async function (req, res, next) {
    let user = await helper.reg(req.body, dbUsers, res)
    let value = JSON.stringify(await helper.auth(req.body, dbUsers, res))
    res.send(value)
})

app.post('/getData', bodyparser.json())
app.post('/getData', async function (req, res, next) {

    let value = JSON.stringify(await helper.getData(req.body.id, dbFriends, dbUsers))
    res.send(value)
    
})

app.post('/send', bodyparser.json())
app.post('/send', async function (req, res, next) {
    let value = JSON.stringify(await helper.send(req.body, dbMessage))
})

app.post('/getMessages', bodyparser.json())
app.post('/getMessages', async function (req, res, next) {

    let value = JSON.stringify(await helper.getMessages(req.body, dbMessage))
    await console.log(value)
    res.send(value)
    
})

app.use(express.static(path + '/'))
MongoClient.connect('mongodb://localhost:27017/chatbd', { useNewUrlParser: true, useUnifiedTopology: true }, function (err, database) {

    dbUsers = database.db('users')
    dbChats = database.db('chats')
    dbMessage = database.db('message')
    dbInvite = database.db('invite')
    dbReq = database.db('requests')
    dbFriends = database.db('friends')
    
    app.listen(8000, function () {

    })
})

