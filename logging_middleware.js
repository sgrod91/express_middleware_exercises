/* jshint esversion: 6 */

//Write an express middleware that will print (console.log) out the request method
//and the request path of all requests in the app, and delegate to the regular route handler.

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs-promise');

app.use(function myMiddleware(request, response, next) {
  console.log(request.methond, request.path);
  next();
});

app.use(function(request, response, next) {
  var contents = request.method + ' ' + request.path;
  fs.appendFile('logfile.txt', contents)
    .then(function() {
      next();
    })
    .catch(next);
});

app.get('/', function I_am_middleware(req, res) {
  res.send('Hello World!');
});

//Write an express middleware that will log the same information as above,
//but in a log file. Log the information using fs or fs-promise.


app.listen(3000, function() {
  console.log('Listening on port 3000.');
});
