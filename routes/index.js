var express = require('express');
var router = express.Router();

/* GET home page. */
var authenticated = false;
router.get('/', function(req, res, next) {
  if(req.user){
    authenticated = true;
    var userJson = req.user._json;
  } else {
    var userJson = null;
  }
  res.render('index', {authenticated: authenticated, user: userJson});
});

router.get('/authsuccess', (req,res)=>{
  authenticated = true;
  res.render('Auth');
});

router.get('/authfailure', (req,res)=>{
  authenticated = false;
  res.render('Auth');
});
module.exports = router;
