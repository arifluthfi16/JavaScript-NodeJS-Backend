const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user.model');
const redis = require('redis');

// Set redis port 
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users', function(req,res,next){
  console.log("Getting all user");
  User.find({})
  .exec((err,users)=>{
    if(err) {
      res.send('error cannot get all user');
    }else{
      res.json(books);
    }
  })
})

router.get('/user/', cache, fetchUserByEmail)

router.post('/user', function(req,res,next){
  let username = req.body.username;
  let email = req.body.email;

  let userBaru = new User({
    username,
    email
  }).save()

  res.render('index', {msg : "new user saved"});
})

router.post('/userUpdate', function(req,res,next){
  const {username,email} = req.body; 

  User.updateOne({username}, {email}, function(err,user){
    if(err || res==null){
      res.render('index', {msg : "Error failed to edit email"})
    }else{
      client.setex(email,3600,username);
      res.render('index', {msg : "Succeed updating an email"})
    }
  })
});

router.post('/deleteUser', function(req,res,next){
  const {email} = req.body;

  User.deleteOne({
    email
  }, function(err,del){
    if(err || res==null){
      res.render('index', {msg : "Error failed to delete user"})
    }else{
      client.del(email);
      res.render('index', {msg : "User deleted"})
    }
  })
})

// Functions and Middleware

async function fetchUserByEmail(req,res,next){
  const {email} = req.query;

  await User.findOne({email})
  .exec((err,user)=>{
    if(err || user===null){
      res.render('index', {msg : `User with email ${email} cannot found`});
    }else{
      console.log("Writing user to redis . . .");
      client.setex(email, 3600, user.username);

      res.render('index', {msg : `User found! Via MongoDB`, foundUsername : user.username});
    }
  })
}

function cache(req,res,next){
  const {email} = req.query;

  console.log(email);

  client.get(email, (err,data)=>{
    if(err) throw err;
    
    if(data !== null){
      client.setex(email, 3600, data);
      res.render('index', {msg : `User found! Via Redis Cache!`, foundUsername : data});
    }else{
      console.log("user not found in cache");
      next();
    }
  })
}


// Connection to database
mongoose.connect("mongodb://localhost/sampledb",{ useNewUrlParser: true ,useUnifiedTopology: true});

module.exports = router;
