const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

passport.use(
    new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        scope: ["profile","email"],
    },
    function (accessToken, refreshToken, profile, callback) {
        callback(null, profile);
    })
);

passport.serializeUser(function (user, callback) {callback(null, user);});
passport.deserializeUser(function (user, callback) {callback(null, user);});

module.exports = passport;