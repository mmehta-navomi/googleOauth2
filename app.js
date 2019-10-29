// https://medium.com/@bogna.ka/integrating-google-oauth-with-express-application-f8a4a2cf3fee
// localhost:3000/auth/google
const express = require('express'),
    app = express(),
    passport = require('passport'),
    auth = require('./auth');
auth(passport);
app.use(passport.initialize());
app.get('/', (req, res) => {
    res.json({
        status: 'session cookie not set'
    });
});
app.get("/index.html",function (req, res) {
  res.send('Hello World')
})

app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {}
);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
