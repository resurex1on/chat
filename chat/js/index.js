const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
// const logIn = require('./LogIn')

let path = __dirname
path = path.substring(0, path.length - 2)

app.use('/logIn/post', function(err, body){
    if(err){

    }else{
        console.log(body)
    }
    
})

// app.use(app.document.getElementById('btnLog').addEventListener('submit', async (e) => function(){
//     console.log('work')
// }))

app.use(express.static(path + '/'))
MongoClient.connect('mongodb://localhost:27017/chatbd', function (err, database) {
    if (err) {
        return console.log(err)
    }
    app.listen(8000, function () {

    })
    console.log([express.static(path + '/')])

    // logIn.startest();
})

