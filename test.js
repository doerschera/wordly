var connection = require('./config/connection');

function objToSql(object) {
	var set = [];

	for (var key in object) {
		if (object.hasOwnProperty(key)) {
			set.push(key + '=' + object[key]);
		}
	}

	return set.toString();
}

function update (table, set, condition, callback) {
	var setValues = objToSql(set);
	var query = 'UPDATE '+table+' SET '+setValues+' WHERE ?';
	console.log(query);
	connection.query(query, condition, function(err, result) {
		if(err) throw err;
		callback(result);
	})
}

update('words', {likes: 'likes+1'}, {id: 2}, function(response) {
	console.log(response);
})
