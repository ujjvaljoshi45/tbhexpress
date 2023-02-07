var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/UserSchema');
const Post = require('../models/PostSchema');

/* GET home page. */
dbUserConnect();
router.get('/', function(req, res, next) {
  if(req.user){
    var userJson = req.user._json;
  } else {
    var userJson = null;
  }
  res.render('index', {user: userJson});
});

router.get('/authsuccess', (req,res)=>{
  res.render('Auth');
});

router.get('/authfailure', (req,res)=>{
  res.render('Auth');
});
router.post('/saveuser', (req,res)=>{
  
  User.findOne({sub : req.user._json.sub}, function (err, usr) {
    if (usr) {
      console.log('found');
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
  await mongoose.connect('mongodb+srv://ujjvaljoshi45:xGRiPfGSHCTjt16S@tbh.0u29soe.mongodb.net/?retryWrites=true&w=majorityr');
}

module.exports = router;
