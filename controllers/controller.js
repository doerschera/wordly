var express = require('express');
var router = express.Router();
var model = require('../models/wordly.js');

var sidebar = {
  add: false,
  favorties: false
}
var currentData;

router.get('/', function(req, res) {
  model.selectAll(function(result) {
    var data = {words: result}
    res.render('index', data);
  })
})

router.post('/filter', function(req, res) {
  var type = req.body.filter;
  console.log(type);
  if(type.typeof != 'string') {
    model.filterMany(type, function(result) {
      var data = {words: result};
      res.render('index', data);
    })
    return false;
  }

  model.selectType(type, function(result) {
    var data = {words: result};
    res.render('index', data);
  })
})



module.exports = router;
