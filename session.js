/* jshint esversion: 6 */
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs-promise');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'default',
  cookie: {
    maxAge: 60000000
  }
}));

//Make session automatically available to all hbs files
app.use(function(req, res, next) {
  res.locals.name = req.session.name;
  console.log(req.session);
  next();
});

app.get('/', function(req, res) {
  res.render('index.hbs');
});

app.get('/ask', function ask(req, res) {
  res.render('submit_name.hbs');
});

app.post('/submit_name', function submit(req, res) {
  var name = req.body.name;
  console.log(name);
  req.session.name = name;
  res.redirect('/greet');
});

app.get('/greet', function greet(req, res, next) {
  res.render('greet.hbs', {name: req.session.name});

});


app.listen(3000, function() {
  console.log('Listening on port 3000.');
});
