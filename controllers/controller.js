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
  var wordType = req.body.filter;

  if(typeof wordType != 'string') {
    model.filterMany(type, function(result) {
      var data = {words: result};
      res.render('index', data);
    })
    return false;
  }

  model.selectType('type', wordType, function(result) {
    var data = {words: result};
    res.render('index', data);
  })
})

router.post('/', function(req, res) {
  var data = req.body
  console.log(data);
  if(data.type == 'validate') {
    model.selectType('word', data.word, function(result) {
      console.log(result);
      if(result.length > 0) {
        res.send(false);
      } else {
        res.send(true);
      }
    })
  } else if(data.type == 'add') {
    var values = [data.word, data.definition, data.wordType, 0];
    model.addWord(values, function() {
      model.selectType('word', data.word, function(result) {
        console.log(result);
        res.send(result[0]);
      })
    })
  } else if(data.type == 'like') {
    model.like({id: data.id}, function() {
      model.selectType('id', data.id, function(result) {
        console.log(result);
        res.send(result[0]);
      })
    })
  }
})




module.exports = router;
