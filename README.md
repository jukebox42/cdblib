# cdblib

**cdblib** is a Node.js module that provides simple CDB read support to node.

Note: Currently this module is experimental and should be treated as such.
There are a few things that are not implimented cleanly and even though it
uses events features such as file connection are still blocking. These 
issues will be addressed in future versions.

## Installation

Dependencies:

	sudo apt-get install libcdb-dev

Install through NPM

	I have not added cdblib to npm yet. Will add as soon as I address the note.

Install through git (*nux only)

	node-gyp configure
	node-gyp build

## Usage

	var cdblib = require('cdblib');

	var cdb = new cdblib({
		filename: 'cdbfile.cdb',
		callback: function(err, conn) {
			conn.get('key_string', function(err, value) {
				console.log(value);
				conn.close();
			})
		}
	});

## Testing

	npm test

## License

**MIT**
