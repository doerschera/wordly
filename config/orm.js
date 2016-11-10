var connection = require('./connection.js');

// print correct number of question marks for INSERT INTO
function printQuestionMarks(num) {
	var values = [];

	for (var i = 0; i < num; i++) {
		values.push('?');
	}

	return values.toString();
}

// take object and change to SET syntax
function objToSql(object) {
	var set = [];

	for (var key in object) {
		if (object.hasOwnProperty(key)) {
			set.push(key + '=' + object[key]);
		}
	}

	return set.toString();
}

var orm = {
  selectAll: function(table, callback) {
    var query= 'SELECT * FROM '+table;
    connection.query(query, function(err, result) {
      if(err) throw err;
      callback(result);
    })
  },
  selectType: function(table, condition, callback) {
    var query= 'SELECT * FROM '+table+' WHERE ?';
    connection.query(query, condition, function(err, result) {
      if(err) throw err;
      callback(result);
    })
  },
  update: function(table, set, condition, callback) {
    var setValues = objToSql(set);
    var query = 'UPDATE '+table+' SET '+setValues+'WHERE ?';
    connection.query(query, condition, function(err, result) {
      if(err) throw err;
      callback(result);
    })
  },
  add: function(table, cols, values, callback) {
    cols.toString();
    var valuesQuest = printQuestionMarks(values.length);
    var query = 'INSERT INTO '+table+' ('+cols+') VALUES ('+valuesQuest+')';

    connection.query(query, values, function(err, result) {
      if(err) throw err;
      callback(result);
    })
  },
  delete: function(table, condition, callback) {
    var query = 'DELETE FROM '+table+' WHERE ?';
    connection.query(query, condition, function(err, result) {
      if(err) throw err;
      callback(result);
    })
  }
}

module.exports = orm;
