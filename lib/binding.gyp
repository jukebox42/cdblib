{
	"targets": [
		{
			"target_name": "cdblib",
			"sources": [ "cdblib_module.cc", "cdblib.cc" ],
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
