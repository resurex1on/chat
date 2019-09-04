var  express = require('express')
var app = express()

let path = __dirname
path = path.substring(0,path.length-2)
app.use(express.static(path + '/'))
app.listen(8000)
