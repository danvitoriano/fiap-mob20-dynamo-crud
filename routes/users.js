var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');

AWS.config.update({
  region: "us-east-1"
});

var docClient = new AWS.DynamoDB.DocumentClient();

/* GET users listing. */
router.post('/create', function (req, res, next) {
  const { fname, lname } = req.body;
  const params = {
    TableName: 'names',
    Item: {
      id: new Date().toISOString(),
      fname,
      lname
    }
  }
  docClient.put({ params }, (err, data) => {
    if (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      next('/list', { title: `${req.body.fname} ${req.body.lname}` })
    }
  });
});

module.exports = router;
