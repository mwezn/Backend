const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');

var ExerciseSchema = new mongoose.Schema({
  username: String,
  count: Number,
  log: []
})

var User = mongoose.model('Username', ExerciseSchema);




router.get('/api/exercise/users', async (req, res)=>{
  const users= await User.find({});
  console.log(users);
  return res.status(201).json(users)
})

router.get('/api/exercise/log', async (req, res)=>{
  const {userId, from, to, limit} = req.query;
  let properResponse={}
  let data;
  await User.find({_id: userId}, function(err, result){
    if(err){ 
      console.log(err)
      res.send(err)
    }
    data=result[0].log
    if(from && to){
      data=data.filter((d)=>(Date.parse(d.date) >= Date.parse(from)) && (Date.parse(d.date) <= Date.parse(to)))
    
      properResponse={"_id":userId, "username": result[0].username, "from": new Date(from).toDateString(),"to":new Date(to).toDateString(), "count":data.length, "log":data}
    }
    if(limit){
      properResponse={"_id":userId, "username": result[0].username, "count":parseInt(limit), "log":data.filter((d,i)=>i<limit)}
    }
    else {
      properResponse={"_id":userId, "username": result[0].username, "count":result[0].log.length, "log":data}
    }

    res.send(properResponse)

    
  })
})


router.post('/api/exercise/add', async (req, res)=>{
   let currTime= new Date();
   const userID=req.body.userId;
   let description=req.body.description;
   let duration=req.body.duration;
   let date= req.body.date;
   console.log(description,duration,date);
   var update = {$addToSet: {log: newvalues}};
   var newvalues =date? {description: req.body.description, duration: parseInt(req.body.duration), date: new Date(date).toDateString()}:{description: req.body.description, duration: parseInt(req.body.duration), date: currTime.toDateString() }
   await User.findByIdAndUpdate(userID,{$addToSet: {log: newvalues}},{new: true}, function(err, result){
     if(err)  return res.status(500).json(err)
     let myRes={"_id": result['_id'], "username": result['username'], ...newvalues}
     //console.log(myRes, result);
     User.update({_id:userID},{count: result.log.length}, (err,result)=>{
       if(err) return res.status(500).json(err)
       console.log(result)
    })
    return res.status(201).json(myRes)
     
   })
})
router.post('/api/exercise/new-user', async (req,res)=>{
  try {
    const username=req.body.username;
    const checkuser= await User.findOne({ "username": username })
    console.log(checkuser)
    if(checkuser) {return res.json("Username already taken")}
    
    const user= await User.create({username, count:0});
    
    console.log(user)
    return res.status(201).json(user);
  } catch(error){
    return res.status(500).json({"error":error})
  }
})




module.exports = router;









