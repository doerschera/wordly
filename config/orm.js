var connection = require('./connection.js');

var orm = {
  selectAll: function(callback) {
    var query= 'SELECT * FROM words';
    connection.query(query, function(err, result) {
      if(err) throw err;
      callback(result);
    })
  },
  selectType: function(type, callback) {
    var query= 'SELECT * FROM words WHERE ?';
    connection.query(query, {type: type}, function(err, result) {
      if(err) throw err;
      callback(result);
    })
  },
  like: function(id, callback) {
    var query = 'UPDATE words SET likes = likes+1 WHERE ?';
    connection.query(query, {id: id}, function(err, result) {
      if(err) throw err;
      callback(result);
    })
  },
  addWord: function(word, defintion, type, callback) {
    var query = 'INSERT INTO words (word, definition, type, likes) VALUES (?, ?, ?, 0)';
    connection.query(query, [word, definition, type], function(err, result) {
      if(err) throw err;
      callback(result);
    })
  },
  updateWord: function(id, word, defintion, type, callback) {
    var query = 'UPDATE words SET ? WHERE id=?';
    connection.query(query, [{word: word, defintion: defintion, type: type}, id], function(err, result) {
      if(err) throw err;
      callback(result);
    })
  },
  deleteWord: function(id, callback) {
    var query = 'DELETE FROM words WHERE ?';
    connection.query(query, {id: id}, function(err, result) {
      if(err) throw err;
      callback(result);
    })
  }
}

module.exports = orm;
