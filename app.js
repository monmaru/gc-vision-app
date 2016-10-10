'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var logging = require('./logging');
var app = express();
var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('gc-vision-app listening at http://%s:%s', host, port);
});

// Add the request logger before anything else so that it can
// accurately log requests.
app.use(logging.requestLogger);

// Activate Google Cloud Trace and Debug when in production
if (process.env.NODE_ENV === 'production') {
  require('@google/cloud-trace').start();
  require('@google/cloud-debug');
}

app.use(bodyParser.json({limit: '3mb'}));
app.use(express.static(__dirname + '/public'));
app.use('/', require('./routes/root'));
app.use('/api', require('./routes/api'));

// Add the error logger after all middleware and routes so that
// it can log errors from the whole application. Any custom error
// handlers should go after this.
app.use(logging.errorLogger);