var cdblib = require('../lib/cdblib');

var cdb = new cdblib({
	filename: __dirname+'/../t/testdb.cdb',
	callback: function(conn) {
		conn.get('zoom', function(value) {
			console.log(value);
			conn.close();
		});
	}
});

var cdb2 = new cdblib({
	filename: __dirname+'/../t/testdb.cdb',
	callback: function(conn) {
		conn.get('zoom', function(value) {
			console.log(value);
		});
		conn.get('another', function(value) {
			console.log(value);
		});
		conn.get('one', function(value) {
			console.log(value);
		});
		conn.get('red', function(value) {
			console.log(value);
			conn.close();
		});
	}
});

