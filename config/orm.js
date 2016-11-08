var connection = require('./connection.js');

var orm = {
  selectAll: function(table, callback) {
    var query= 'SELECT * FROM '+table;
    connection.query(query, function(err, result) {
      if(err) throw err;
      callback(result);
    })
  },
  selectType: function(table, type, callback) {
    var query= 'SELECT * FROM '+table+' WHERE ?';
    connection.query(query, {type: type}, function(err, result) {
      if(err) throw err;
      callback(result);
    })
  },
  like: function(table, id, callback) {
    var query = 'UPDATE '+table+' SET likes = likes+1 WHERE ?';
    connection.query(query, {id: id}, function(err, result) {
      if(err) throw err;
      callback(result);
    })
  },
  addWord: function(table, word, defintion, type, callback) {
    var query = 'INSERT INTO '+table+' (word, definition, type, likes) VALUES (?, ?, ?, 0)';
    connection.query(query, [word, definition, type], function(err, result) {
      if(err) throw err;
      callback(result);
    })
  },
  updateWord: function(table, id, word, defintion, type, callback) {
    var query = 'UPDATE '+table+' SET ? WHERE id=?';
    connection.query(query, [{word: word, defintion: defintion, type: type}, id], function(err, result) {
      if(err) throw err;
      callback(result);
    })
  },
  deleteWord: function(table, id, callback) {
    var query = 'DELETE FROM '+table+' WHERE ?';
    connection.query(query, {id: id}, function(err, result) {
      if(err) throw err;
      callback(result);
    })
  }
}

module.exports = orm;
