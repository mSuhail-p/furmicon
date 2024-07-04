const passport = require('passport');

// const GoogleStrategy = require('passport-google-oauth2');

const GoogleStrategy = require('passport-google-oauth2').Strategy


passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser(function (user, done) {
    done(null, user);
})

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    // callbackURL: 'http://localhost:3000/auth/google/callback',
    callbackURL: 'https://furnifusion.online/auth/google/callback',
    passReqToCallback: true


},
    function (request, accessToken, refreshToken, profile, done) {
        console.log(profile)
        return done(null, profile);
    }

))