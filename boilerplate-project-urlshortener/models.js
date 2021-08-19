const mongoose=require('mongoose');

const urlSchema = new mongoose.Schema({
  shortUrl:String,
  longUrl:String
})

module.exports=mongoose.model('url',urlSchema);