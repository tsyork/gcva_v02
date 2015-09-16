var express = require('express');
var stormpath = require('express-stormpath');
var path = require('path');

var app = express();

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'jade');

var stormpathMiddleware = stormpath.init(app, {
  apiKeyFile: '../_priv/apiKey-1DB46OH4XTNQ1QP5OGM8XNHID.properties',
  application: 'https://api.stormpath.com/v1/applications/3F4F2drVsnl21Gm4VB0VUH',
  secretKey: '/KKYVV0+22mb5Ymbq83c5SN/Uo1hKcQDwzkh3u2MxVw',
  expandCustomData: true,
  enableForgotPassword: true,
  enableForgotPasswordChangeAutoLogin: true,
  redirectUrl: '/dashboard'
});

// use middleware

app.use(express.static(path.join(__dirname,'scripts')));
app.use(express.static(path.join(__dirname,'bower_components')));
app.use(express.static(path.join(__dirname,'resources')));
//app.use(express.static(path.join(__dirname,'css')));

app.use(stormpathMiddleware);

// define routes

app.get('/', function(req, res) {
  res.render('home', {
    title: 'Welcome'
  });
});

//app.get('/dashboard', function(req, res){
//  res.render()
//})

app.use('/profile',stormpath.loginRequired,require('./profile')());
app.use('/dashboard',stormpath.loginRequired,require('./dashboard')());
app.listen(3000);

module.exports = app;
