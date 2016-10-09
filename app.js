'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('gc-vision-app listening at http://%s:%s', host, port);
});

app.use(bodyParser.json({limit: '3mb'}));
app.use(express.static(__dirname + '/public'));
app.use('/', require('./routes/root'));
app.use('/api', require('./routes/api'));