function printOr(array) {
	var conditions = []
	array.forEach(function(item, i) {
    if(i < (array.length-1)) {
    conditions.push('type='+item+' OR');
  } else {
    conditions.push('type='+item);
  }
	})

	console.log(conditions.toString());
}

printOr(['verb', 'noun']);
