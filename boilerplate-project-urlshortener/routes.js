const express = require('express')
const router = express.Router()
const dns=require('dns');
const nanoid=require('nanoid');
const Url=require('./models.js')


//{original_url:original,short_url:result['shortUrl']}


router.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

router.get('/api/shorturl/:short', async (req,res)=>{
  const shortId=req.params.short;
  console.log(shortId);
  let data= await Url.findOne({shortUrl: shortId}, function(error,result){
    if (error) res.status(404).send({error: error})
    if(result) res.redirect(result['longUrl'])
  })
  console.log(data);

})


router.post('/api/shorturl/new', async (req, res)=>{
  const original= req.body.url;
  console.log(original)
  const httpRegex = /^(http|https)(:\/\/)/; 
  if (!httpRegex.test(original)) {return res.json({ error: 'invalid url' })} 
  let url;
  try{
    url=new URL(original)
  } catch(err){
    return res.send({error: 'invalid url'})
  }
   dns.lookup(url.hostname, async (err) => {
    if (err) {
      return res.status(404).send({ error: 'invalid url' });
    }
  else {
      await Url.findOneAndUpdate({ longUrl: url },
    {
      $setOnInsert: {
        longUrl: url,
        shortUrl: nanoid.nanoid(7),
      },
    },
    {
      returnOriginal: true,
      upsert: true,
    },
    function(err, result){
     
     if(err)  return res.status(500).json(err)
     Url.find({longUrl: original}, async (err,data)=>{
      if(err) console.log(err)
      console.log(data)
      const { longUrl, shortUrl } = data[0]
      return res.status(200).json({"original_url":longUrl, "short_url": shortUrl})
      
     })
     
     
    

     })

  };
  
  
})

})
module.exports=router