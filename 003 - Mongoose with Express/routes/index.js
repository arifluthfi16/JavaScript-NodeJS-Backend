var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../model/user.model');

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

router.get('/user/', function(req,res,next){
  console.log("Getting user with the email : "+req.params.email);
  User.findOne({email : req.query.email})
  .exec((err,user)=>{
    if(err || user===null){
      res.render('index', {msg : `User with email ${req.params.email} cannot found`});
    }else{
      console.log(user);
      res.render('index', {msg : `User found!`, foundUsername : user.username});
    }
  })
})

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
  User.updateOne({username : req.body.username}, {email : req.body.email}, function(err,user){
    if(err || res==null){
      res.render('index', {msg : "Error failed to edit email"})
    }else{
      res.render('index', {msg : "Succeed updating an email"})
    }
  })
});

router.post('/deleteUser', function(req,res,next){
  User.deleteOne({
    email : req.body.email
  }, function(err,del){
    if(err || res==null){
      res.render('index', {msg : "Error failed to delete user"})
    }else{
      res.render('index', {msg : "User deleted"})
    }
  })
})

// Connection to database
mongoose.connect("mongodb://localhost/sampledb",{ useNewUrlParser: true ,useUnifiedTopology: true});

module.exports = router;
