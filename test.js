var mysql = require('mysql');
var connection = mysql.createConnection({
  port: 3306,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'wordly'
});

connection.connect(function(err) {
  if(err) {
    console.error('error connecting: '+err.stack);
    return;
  }
})

function selectAll (table, callback) {
  var query= 'SELECT * FROM '+table;
  connection.query(query, function(err, result) {
    if(err) throw err;
    callback(result);
  })
}

function update (table, set, where, callback) {
  var query = 'UPDATE '+table+' SET '+set+' WHERE ?';
  console.log(query);
  connection.query(query, where, function(err, result) {
    if(err) throw err;
    callback(result);
  })
}

function add (table, cols, values, callback) {
  cols.toString();
  values.toString();
  var query = 'INSERT INTO '+table+' ('+cols+') VALUES (?, ?, ?, ?)';
  console.log(query);
  connection.query(query, values, function(err, result) {
    if(err) throw err;
    callback(result);
  })
}

// add('words', ['word', 'definition', 'type', 'likes'], ['supple', 'pliable', 'adjective', 0], function(result){console.log(result)});

update('words', {word: 'supple', definition: 'pliable', type: 'noun'}, {id: 100}, function(result){console.log(result)});
