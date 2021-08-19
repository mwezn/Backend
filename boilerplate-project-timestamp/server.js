// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date",(req,res)=>{
  let obj;
  let date=req.params.date;
  
  let DATE=new Date(date)
  if(DATE=="Invalid Date"){
    let adjDate=new Date(parseInt(date))
    console.log(adjDate.getTime())
    if(adjDate=="Invalid Date"){
      let err={ error : "Invalid Date" }
      res.json(err)
      
    }
    else {
      obj= {"unix": adjDate.getTime(), "utc": adjDate.toGMTString()}
      res.json(obj)
    }
  }
  obj={"unix": DATE.getTime(), "utc": DATE.toGMTString()}

  res.json(obj)
})
app.get("/api/timestamp/",(req,res)=>{
  let obj;
  let t=new Date();
  obj={"unix": t.getTime(), "utc": t.toGMTString()}
  res.json(obj)
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
