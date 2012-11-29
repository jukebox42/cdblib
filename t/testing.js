var cdblib = require('../lib/cdblib');

// See txt version of cdb file for spot check

exports["Basic Test"] = {
	"First Key": function(test) {
		var cdb = new cdblib({
			filename: __dirname+'/testdb.cdb',
			callback: function(conn) {
				conn.get('zoom', function(value) {
					conn.close();
					
					test.equal(value,'Hey, I just met you', 'Got correct value');
					test.done();
				});
			}
		});
	},
	"Another Key": function(test) {
		var cdb = new cdblib({
			filename: __dirname+'/testdb.cdb',
			callback: function(conn) {
				conn.get('another', function(value) {
					conn.close();
					
					test.equal(value,'and this is crazy', 'Got correct value');
					test.done();
				});
			}
		});
	},
	"Missing Key": function(test) {
		var cdb = new cdblib({
			filename: __dirname+'/testdb.cdb',
			callback: function(conn) {
				conn.get('missing', function(value) {
					conn.close();
					
					test.equal(value,'', 'Got empty value');
					test.done();
				});
			}
		});
	},
	"No Filename": function(test) {
		var fell_in_catch = false;
		try {
			var cdb = new cdblib({
				filename: '',
				callback: function(conn) {
					conn.get('nice_try', function(value) {
						conn.close();
						
						test.ok(fell_in_catch, 'Did not hit the catch block');
						test.done();
					});
				}
			});
		} catch(err) {
			fell_in_catch = true;
			test.ok(fell_in_catch, 'Hit the catch block');
			test.equal(err.message, 'Must provide a filename', 'Got correct error message');
			test.done();
		}
	},
	"Bad CDB": function(test) {
		var fell_in_catch = false;
		try {

			var cdb = new cdblib({
				filename: __dirname+'/baddb.cdb',
				callback: function(conn) {
					conn.get('nice_try', function(value) {
						conn.close();

						test.ok(fell_in_catch, 'Did not hit the catch block');
						test.done();
					});
				}
			});
		} catch(err) {
			fell_in_catch = true;
			test.ok(fell_in_catch, 'Hit the catch block');
			test.equal(err.message, 'CDB malformed in cdb_init', 'Got correct error message');
			test.done();
		}
	},
	"Missing CDB": function(test) {
		var fell_in_catch = false;
		try {
			var cdb = new cdblib({
				filename: 'omgyes.cdb',
				callback: function(conn) {
					conn.get('nice_try', function(value) {
						conn.close();

						test.ok(fell_in_catch, 'Did not hit the catch block');
						test.done();
					});
				}
			});
		} catch(err) {
			fell_in_catch = true;
			test.ok(fell_in_catch, 'Hit the catch block');
			test.equal(err.message, 'No such file or directory', 'Got correct error message');
			test.done();
		}
	},
};
