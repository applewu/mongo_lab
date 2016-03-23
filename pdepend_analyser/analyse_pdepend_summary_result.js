// Make sure the summary_result of pdepend had imported locally yet.
// mongoimport --file summary_result.json
// The .json file is converted by pdepend xml report
// https://pdepend.org/documentation/getting-started.html
var doc = db.summary_result.findOne();

doc.metrics.package.forEach(function(my_package) {
	var temp_class = typeof my_package['class']
		// Check if the 'class' field had existed
	if (temp_class == "object") {
		var temp_class_len = typeof my_package['class'].length
			// Check if the 'class' filed is array; true means 'array', false means k-v object
		if (temp_class_len != "undefined") {
			my_package['class'].forEach(
				function(my_class) {
					print(my_class['@name'] + ",,,");
					var temp_method = typeof my_class['method']
						// Check if the 'method' field had existed
					if (temp_method == "object") {
						var temp_method_len = typeof my_class['method'].length
							// Check if the 'method' filed is array; true means 'array', false means k-v object
						if (temp_method_len != "undefined") {
							my_class['method'].forEach(function(my_method) {
								print("," + my_method['@name'] + "," + my_method['@ccn'] + "," + my_method['@ccn2']);
							})
						}
						// if the 'method' is k-v object, no need 'forEach' function, could get the value directly
						else {
							print("," + my_class['method']['@name'] + "," + my_class['method']['@ccn'] + "," + my_class['method']['@ccn2']);
						}
					}
				})
		}
		// if the 'class' is k-v object, no need 'forEach' function, could get the value directly 
		else {
			print(my_package['class']['@name'] + ",,,");
			var temp_method = typeof my_package['class']['method']
				// Check if the 'method' field had existed
			if (temp_method == "object") {
				var temp_method_len = typeof my_package['class']['method'].length
					// Check if the 'method' filed is array; true means 'array', false means k-v object
				if (temp_method_len != "undefined") {
					my_package['class']['method'].forEach(function(my_method) {
						print("," + my_method['@name'] + "," + my_method['@ccn'] + "," + my_method['@ccn2']);
					})
				}
				// if the 'method' is k-v object, no need 'forEach' function, could get the value directly
				else {
					print("," + my_package['class']['method']['@name'] + "," + my_package['class']['method']['@ccn'] + "," + my_package['class']['method']['@ccn2']);
				}
			}

		}
	}
})