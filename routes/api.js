'use strict';
var request = require('request');
var express = require('express');
var router = express.Router();

router.post('/vision', function(req, res) {
  var image = req.body.image.match(/base64,(.*)$/)[1];
  var key = process.env.VISION_API_KEY;
  var params = {
    uri: 'https://vision.googleapis.com/v1/images:annotate?key=' + key,
    headers: {'Content-Type': 'application/json'},
    json: {
      'requests': [
        {
          'image': { 'content': image },
          'features': [
            { 'type': 'FACE_DETECTION', 'maxResults': 5 },
            { 'type': 'LABEL_DETECTION', 'maxResults': 5 },
            { 'type': 'TEXT_DETECTION', 'maxResults': 5 },
            { 'type': 'LANDMARK_DETECTION', 'maxResults': 5 },
            { 'type': 'LOGO_DETECTION', 'maxResults': 5 },
            { 'type': 'SAFE_SEARCH_DETECTION', 'maxResults': 5 }
          ]
        }
      ]
    }
  };

  request.post(params, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.status(200).json(body.responses)
    } else {
      console.log(error);
      res.status(500).json({ status: 'err' })
    }
  });
});

module.exports = router;