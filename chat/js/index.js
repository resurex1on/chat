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

let path = __dirname
path = path.substring(0, path.length - 2)

app.post('/logIn', bodyparser.json())
app.post('/logIn', async function (req, res, next) {

    let value = JSON.stringify(await helper.auth(req.body, dbUsers, res))
    res.send(value)

})

app.post('/signUp', bodyparser.json())
app.post('/signUp', async function (req, res, next) {
    let user = helper.reg(req.body, dbUsers, res)
    await storage.get({
        key: await helper.auth(user, dbUsers, res)
    })
    
    console.log(storage.key)

})

app.post('/getData', bodyparser.json())
app.post('/getData', async function (req, res, next) {
    let value = JSON.stringify(req.body, dbUsers, res)

    res.send(value)


})

app.use(express.static(path + '/'))
MongoClient.connect('mongodb://localhost:27017/chatbd', function (err, database) {
    if (err) {
        return console.log(err)
    }

    dbUsers = database.db('users')
    dbChats = database.db('chsats')
    dbInvite = database.db('invite')
    dbReq = database.db('requests')

    app.listen(8000, function () {

    })
})

