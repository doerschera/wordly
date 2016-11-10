var express = require('express');
var router = express.Router();
var model = require('../models/wordly.js');



router.get('/', function(req, res) {
  model.selectAll(function(response) {
    console.log(response);
    var data = {words: response}
    res.render('index', data);
  })
})

// router.get('/submit', function(req, res) {
//   res.render('submit');
// })

module.exports = router;
