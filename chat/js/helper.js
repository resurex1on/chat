const express = require('express')
const MongoClient = require('mongodb').MongoClient
const async = require('async')

module.exports = {
    async auth(user, db, resp) {
        

        return new Promise((resolve,reject) =>
        {
            db.collection('users').find({}).toArray( async function (err, res) {
                if (err) {
                    res.status(500)
                } else {
                    let val = await check(res, user)
    
                    if (val === false)
                        return val
                    else
                    {
                        resolve(val)
                    }
                        
    
                }
    
            })
        }) 
        

        async function check(users, user) {
            let count = 0

            for (const i of users) {
                console.log(user)
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
                            console.log(user)
                            return user
                        }
                    }))
            }
        })

        async function check(users, user) {
            let count = 0

            for (const i of users) {
                console.log(user.login + ' ' + i['login'])
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
