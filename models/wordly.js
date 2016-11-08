var orm = requier('../config/orm.js');

var model = {
  selectAll: function(callback) {
    orm.selectAll('words', function(result) {
      callback(result);
    })
  },
  selectType: function(type, callback) {
    orm.selectType('words', {type: type}, function(result) {
      callback(result);
    })
  },
  like: function(condition, callback) {
    orm.update('words', {likes: 'likes+1'}, condition, function(result) {
      callback(result);
    })
  },
  addWord: function(values, callback) {
    orm.add('words', ['word', 'defintion', 'type', 'likes'], values, function(result) {
      callback(result);
    })
  },
  deleteWord: function(condition, callback) {
    orm.delete('words', condition, function(result) {
      callback(result);
    })
  }
}
