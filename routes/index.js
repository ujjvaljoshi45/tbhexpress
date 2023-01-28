var express = require('express');
var router = express.Router();

/* GET home page. */
var authenticated = false;
router.get('/', function(req, res, next) {
  res.render('index', {authenticated: authenticated});
});

module.exports = router;
