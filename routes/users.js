var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Login
router.get('/login',function(req,res,next){
  res.render('auth');
});
router.post('/login',function(req,res,next){
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  console.log(userEmail);
  console.log(userPassword);
  res.render('auth');
});
module.exports = router;
