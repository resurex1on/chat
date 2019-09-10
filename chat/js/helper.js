const express = require('express')
const MongoClient = require('mongodb').MongoClient
const async = require('async')

module.exports = {

    async getData(id, db) {
        let friends = db.collection('friends').find({}).toArray(async function (err, res) { if (err) res.status(500); return (res) })
        let users = db.collection('users').find({}).toArray(async function (err, res) { if (err) res.status(500); return (val) })
        let name
        let friendsData = []

        for (const i of users) {
            if (i['_id'] === id)
                name = i['login']
        }

        for (const j of friends) {
            if (j['first'] === id || j['second'] === id)
                friendsData.push({
                    first: j['first'],
                    second: j['second']
                })
        }
    },

    async send(message, db) {

        let value = {
            text: message.text,
            idChat: message.idChat,
            idFrom: message.id
        }

        db.collection('messages').insert(value, (function (err, res) {
            if (err)
                res.status(500)
        }))
    },

    async auth(user, db, resp) {
        return new Promise((resolve, reject) => {
            db.collection('users').find({}).toArray(async function (err, res) {
                if (err) {
                    res.status(500)
                } else {
                    let val = await check(res, user)

                    if (val === false)
                        return val
                    else {
                        resolve(val)
                    }


                }

            })
        })


        async function check(users, user) {
            let count = 0

            for (const i of users) {
                if (i['login'] === user.login && i['password'] === user.password) {
                    return i['_id']
                } else {
                    count++
                }
                if (count === users.legth) {
                    return false
                }
            }
        }
    },

    async reg(user, db, users) {
        db.collection('users').find({}).toArray(function (err, res) {
            if (err) {
                res.status(500)
            } else {
                let val = check(res, user)

                if (val === false)
                    return val
                else
                    db.collection('users').insert(user, (function (err, res) {
                        if (err) {
                            res.status(500)
                        } else {
                            return user._id
                        }
                    }))
            }
        })

        async function check(users, user) {
            let count = 0

            for (const i of users) {
                if (i['login'] === user.login) {
                    return false
                } else {
                    count++
                }
                if (count === users.legth) {
                    return true
                }
            }

        }
    }
}
