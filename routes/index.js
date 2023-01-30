var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/UserSchema');
const Post = require('../models/PostSchema');

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
router.post('/saveuser', (req,res)=>{
  dbUserConnect();
  User.findOne({sub : req.user._json.sub}, function (err, usr) {
    if (usr) {
      authenticated = true;
    } else {
      const user = new User({
        sub: req.user._json.sub,
        name: req.user._json.name,
        email: req.user._json.email,
        picture: req.user._json.picture,
      });
      user.save();
      console.log('not found');}
  });
});

router.post('/addpost', (req,res)=> {
  const post = new Post({
    user: req.user._json.sub,
    body: req.body.post,
    date: new Date(),
  });
  post.save();
  console.log(post);
  res.send('Post Saved');
});

//DBConnections
async function dbUserConnect(){
  await mongoose.connect('mongodb://127.0.0.1/user');
}

module.exports = router;
