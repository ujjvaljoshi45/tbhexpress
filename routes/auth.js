const router = require('express').Router();
const passport = require('passport');

router.get("/google/callback",passport.authenticate('google',{
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/auth/login/failure',
}));

router.get("/google",passport.authenticate('google', ["profile","email"]));

router.get("/logout", (req,res) => {
    req.session.destroy();
    res.redirect('/authfailure');
}); 

router.get('/login/failure', (req,res) => {
    res.render('error');
});

module.exports = router;