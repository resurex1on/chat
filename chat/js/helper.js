const express = require('express')
const MongoClient = require('mongodb').MongoClient
const async = require('async')

module.exports = {

    async getUsers(dbUs) {
        return new Promise((resolve, reject) => {
            dbUs.collection('users').find({}).toArray(async function (err, res) {
                if (err)
                    res.status(500)
                else
                    resolve(res)
            })
        })
    },

    async getFriends(dbFr) {
        return new Promise((resolve, reject) => {
            dbFr.collection('friends').find({}).toArray(async function (err, res) {
                if (err)
                    res.status(500)
                else
                    resolve(res)
            })
        })
    },

    async getData(id, dbFr, dbUs) {

        let friends = await this.getFriends(dbFr)
        let users = await this.getUsers(dbUs)

        let userData = []
        let friendsData = []
        let idFriend = []

        for (const i of users) {
            if (i['_id'] == id)
                userData.push({
                    name: i['login'],
                    img: i['img']
                })
        }

        for (const j of friends) {
            if (j['first'] == id || j['second'] == id)
                friendsData.push({
                    first: j['first'],
                    second: j['second']
                })
        }

        

        for (const j of friendsData) {
            if (j['first'] == id) {
                idFriend.push({
                    idFriend: j['second']
                })
            } else {
                idFriend.push({
                    idFriend: j['first']
                })
            }

        }

        let listFriends = []
        for (let i = 0; i < idFriend.length; i++) {
            
            for (const j of users) {
                if (j['_id'] == idFriend[i]['idFriend'])
                {
                    console.log('work')
                    await listFriends.push({
                        name: j['login'],
                        img: j['img']
                    })
                }
                   
            }
        }
        console.log(userData)
       
        return {
            user: userData,
            friends: listFriends
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
