var orm = require('../config/orm.js');

var model = {
  selectAll: function(callback) {
    orm.selectAll('words', function(result) {
      callback(result);
    })
  },
  selectType: function(col, type, callback) {
    var condition = {};
    condition[col] = type;
    orm.selectType('words', condition, function(result) {
      callback(result);
    })
  },
  filterMany: function(array, col, callback) {
    orm.filterMany('words', array, col, function(result) {
      callback(result);
    })
  },
  like: function(condition, callback) {
    orm.update('words', {likes: 'likes+1'}, condition, function(result) {
      callback(result);
    })
  },
  update: function(set, condition, callback) {
    orm.updateString('words', set, condition, function(result) {
      callback(result);
    })
  },
  addWord: function(values, callback) {
    orm.add('words', ['word', 'definition', 'type', 'likes'], values, function(result) {
      callback(result);
    })
  },
  deleteWord: function(condition, callback) {
    orm.delete('words', condition, function(result) {
      callback(result);
    })
  }
}

module.exports = model;
