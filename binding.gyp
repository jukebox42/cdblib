{
	"targets": [
		{
			"target_name": "cdblib",
			"sources": [ "lib/cdblib_module.cc", "lib/cdblib.cc" ],
			"conditions" : [
				[
					'OS=="linux"', {
						"libraries" : [
							'-lcdb',
						],
					}
				]
			]
		}
	]
}
