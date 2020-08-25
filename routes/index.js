var express = require('express');
var router = express.Router();
// var AWS = require('aws-sdk');

// AWS.config.update({
//   region: "us-east-1",
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('views/initial', { title: 'Express' });
});

router.get('/list', function(req, res, next) {
  // let client = new AWS.DynamoDB.DocumentClient();
  client.scan({TableName: 'names'}, (err, data) => {
    if (err) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
  } else {
      console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
      res.render('list', { title: JSON.stringify(data) });
  }
  });
});

router.get('/create', function(req, res, next) {
  res.render('create');
});

module.exports = router;
