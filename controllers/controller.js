var express = require('express');
var router = express.Router;
var model = require('../models/wordly.js');

router.get('/', function(req, res) {
  res.render('index');
})

router.get('/submit', function(req, res) {
  res.render('submit');
})
