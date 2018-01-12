'use strict';

var compression = require('compression');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(compression());
app.use('/assets', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get('/', function(req, res, next){
  var path = req.path;
  res.locals.path = path;
  res.render('index');
});


app.get('/welcome', function(req, res){
  res.render('welcome');
});

// get sitemap for the google
app.get('/sitemap/:name', function(req, res) {
  var options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
  });
});

app.get('/giveaway', function(req, res) {
  res.redirect('https://sanchezstudioco.typeform.com/to/amIjkC');
})

app.listen(4000, function() {
  console.log("The frontend server is running on port 4000!");
});
