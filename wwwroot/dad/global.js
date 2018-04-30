//global variables

try {

	var nPoints = 0;
	var txtStats = "";
	var arrStats = new Array(); //empty array
	var textStats = new Array();
	var nAlgo = 0;
	var optColors = ['POS over Words', 'Sent', 'POS over POS'];

	var numItems = 0;
	var offset = 0;
	var pathSegments = 200;
	var textMetrics = new Array;
	var dotInterval;
	var minR = 5;
	var maxR = 100;

} catch (err) {
	alert(err.message);
}


function loadOptions() {
	//color choice
    var x = document.getElementById("optColor");
	for (var i=0; i < optColors.length; i++) {
		var c = document.createElement("option");
    	c.text = optColors[i];
    	x.options.add(c, 0);
	}
	x.options[0].selected = 'selected';
	
	// other option sets later
    
}
