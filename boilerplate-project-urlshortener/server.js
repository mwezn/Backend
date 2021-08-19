require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
var bodyParser=require("body-parser");
const mongoose = require('mongoose')
const roots=require('./routes.js')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(bodyParser.urlencoded({extended: false}))

const port = process.env.PORT || 3000;


app.use(cors());
app.use(roots)

app.use('/public', express.static(`${process.cwd()}/public`));





app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
