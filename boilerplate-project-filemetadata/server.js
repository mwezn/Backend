var express = require('express');
var cors = require('cors');
var fs=require('fs');
const fileUpload = require('express-fileupload');


require('dotenv').config();

var app = express();
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'))
app.use(fileUpload());
app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});
app.post('/api/fileanalyse', (req,res)=>{
  console.log(req.files);
  let obj={"name": req.files.upfile.name,"type": req.files.upfile.mimetype,"size": req.files.upfile.size}
  console.log(obj)
  res.json(obj)
})




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
