var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/UserSchema');
const Post = require('../models/PostSchema');

/* GET home page. */
var authenticated = false;
dbUserConnect();
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
    user: req.user._json.name,
    userSub: req.user._json.sub,
    body: req.body.post,
    date: new Date(),
  });
  post.save();
  console.log(post);
  res.status(200).json({status: 'success'});
});

router.get('/getpost', (req,res)=> {
  Post.find({}, function(err, posts) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({status: 'success', post: posts});
    }
  });
});

router.get('/getuserposts', (req,res) => {
  Post.find({userSub: req.user._json.sub}, function(err, posts) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({status: 'success', post: posts});
    }
  });
});
//DBConnections
async function dbUserConnect(){
  await mongoose.connect('mongodb://127.0.0.1/user');
}

module.exports = router;
