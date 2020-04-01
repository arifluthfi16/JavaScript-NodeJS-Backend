const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Homepage' });
});

// Post Request
router.post('/sendWithPost', function(req,res,next){
  let username = req.body.username;
  let email    = req.body.email;

  res.send(`${username} dengan email : ${email}`);
});

// Get Request Unspecified
router.get('/sendWithGet', function(req,res,next){
  let username = req.query.username;
  let email    = req.query.email;
  
  res.send(`${username} dengan email : ${email}`);
})

// Get Request Specified
// Example Request URL : localhost:3000/sendSpecifiedGet/2
router.get('/sendSpecifiedGet/:number', (req,res,next)=>{
  // If we specify the parameter, we can use params function
  res.send('Number is : '+req.params.number);
})


module.exports = router;
