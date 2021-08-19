require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const router = require('./routes2') 
const cors = require('cors')
const bodyParser=require("body-parser")

app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())
app.use(router)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
