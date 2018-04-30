// 1: create dots as new Group
var dots = new Group;
// 2: create paths as new Group
var paths = new Group;
// 3: create centerX as half the clientHeight of the divOutput element
var centerX = 0.5*document.getElementById("divOutput").clientHeight;
// 4: create centerY as half the clientWidth of the divOutput element
var centerY = 0.5*document.getElementById("divOutput").clientWidth;

function addDotInterval() {
	try {
		// 1: set the length of textMetrics to a variable called maxSent
		var maxSent = textMetrics.length;
		// 2: if numItems is less than maxSent then call addDot function with passing the numItems element of textMetrics array 
		//          else call the clearInterval function passing dotInterval also show the numItems on the nlpStats element on the form
		if (numItems < maxSent) {
			addDot(textMetrics[numItems]);
		} else {
			clearInterval(dotInterval);
			document.getElementById("nlpStats").innerText = numItems;	
		}
	} catch(err) {
		alert(err.message);
	}
}

function addDot(v) {
	//v will be the values from the NLP part
	try {
		// 1: create a variable d by passing v into the getDot function
		var d = getDot(v);
	
		// 2: rotate d by 137.5*(numItems-1)
		d.rotate(137.5*(numItems-1));
		// 3: create a variable l as a new Path()
		var l = new Path();
		// 4: set the fillColor of d using the getColor function	
		d.fillColor = getColor(v);
		// 5: set the strokeColor of d to a Color(0.8, 0.8, 0.8)
		d.strokeColor = new Color(0.8, 0.8, 0.8);
		// 6: set the strokeWidth to 1;		
		d.strokeWidth = 1;	
		
		// 7: add a new Point at centerX and centerY and add to l
		l.add(new Point(centerX, centerY));
		// 8: add a new Point at centerX and 0 and add to l
		l.add(new Point(centerX, 0));
		// 9: l.rotate(137.5*(numItems-1), new Point(centerX,centerY));
		l.rotate(137.5*(numItems-1), new Point(centerX, centerY));
 		
		//10: bring d to front
		d.bringToFront();
		//11: set the position of d using l.getPointAt(0)	
		d.position = l.getPointAt(0);

		//12: increment numItems by 1
		numItems = numItems + 1;
		//13: call moveDots();
		moveDots();
		
		//14: append d to top of dots group
		dots.appendTop(d);
		//15: append l to top of paths group
		paths.appendTop(l);

	} catch(err) {
		alert(err.message);
	}
}

function getColor(v) {
	// 1: create optColor and set to nAlgo
	var optColor = nAlgo;
	// 2: create iRed, iGreen, iBlue and set all to 0
	var iRed = 0;
	var iGreen = 0;
	var iBlue = 0;
	// 3: create pNoun, pVerb, pAdjAdv as set all to 0
	var pNoun = 0;
	var pVerb = 0;
	var pAdjAdv = 0;
	// 4: create iAlpha and set to 1
	var iAlpha = 1;
	// 5: create s and set to the result of passing v[11] to the getSentValue function
	var s = getSentValue(v[11]);
	// 6: do a switch command on optColor
	//		when case is 0 
	//			set iAlpha to 0.75 - (s/12)
	//			set iRed to v[13]
	//			set iGreen to v[14]
	//			set iBlue to v[15]
	//		when case is 1
	//			set iAlpha = 0.5+v[14]
	// 			if s less than 0 then iRed = -(s/3) 
	//			if s greater than 0 then iGreen = s/3
	//			set iBlue to v[13]
	switch(optColor) {
		case 0:
			iAlpha = 0.75-(s/12);
			iRed = v[13];
			iGreen = v[14];
			iBlue = v[15];
			break;
		case 1:
			iAlpha = 0.5+v[14];
			if (s<0) {
				iRed = -(s/3);
			} 
			if (s>0) {
				iGreen = s/3;	
			} 
			iBlue = v[13];
			break;
		}

	// 7: create newColor as new Color passing in iRed, iGreen, iBlue and iAlpha
	var newColor = new Color(iRed, iGreen, iBlue, iAlpha);
	
	// 8: return newColor from function	
	return newColor;
}



function moveDots() {
	try {
		var offset = 0;
		// 1: create a var cntDots as the length of the children in the dots group
		var cntDots = dots.children.length;
		// 2: loop i from 0 to cntDots-1
		//		set offset to ((numItems - i) / pathSegments) * paths.children[i].length 
		//		set the position of the ith element of dots.children to paths.children[i].getPointAt(offset)
		for (var i = 0; i <= cntDots - 1; i++) {
			offset = ((numItems - i) / pathSegments) * paths.children[i].length;
			dots.children[i].position = paths.children[i].getPointAt(offset);
		}
		
	} catch(err) {
		alert(err.message);
	}
	
}

function getDot(v) {
	try {
		// 1: create variable r and set to minR + the first element of v array
		var r = minR + v[0];
		// 2: if r is greater than maxR then set to maxR
		if (r > maxR) {
			r = maxR;
		}

		// 3: create a variable center as a new Point at centerX and centerY
		var center = new Point(centerX, centerY);
	
		// 4: if nPoints is 0 or 1 then create var newDot as a Circle with radius r
		//		else if nPoints is 3 then create newDot as RegularPolygon with center, nPoints and r
		//		else create newDot as Star with center, nPoints, r-(1.5*nPoints), r	
		if (nPoints == 0 || nPoints == 1) {
			var newDot = new Path.Circle({radius: r});
		} else if (nPoints == 3) {
			var newDot = new Path.RegularPolygon(center, nPoints, r);
		} else {
			var newDot = new Path.Star(center, nPoints, r-(1.5*nPoints), r);
		}
	
		// 5: return the variable newDot
		return newDot;	
	} catch(err) {
		alert(err.message);
	}
}

function getSentValue(c) {
	// 1: create a variable sentValue and set to 0
	var sentValue = 0;
	// 2: if c is greate than 3 then set sentValue to 3
	//      else if c is less than -3 then set sentValue to -3
	//		else set set sentValue to c
	if (c > 3) {
		sentValue = 3;
	} else if (c < -3) {
		sentValue = -3;
	} else {
		sentValue = c;
	}
	// 3: return sentValue
	return sentValue;
}



window.clearArt = function() {
	// 1: call clearCanvas passing in the name of the canvas from index.html
	clearCanvas("myCanvas");
	// 2: set numItems to 0
	numItems = 0;
	// 3: call removeChildren for dots group
	dots.removeChildren();
	// 4: call removeChildren for paths group
	paths.removeChildren();
	// 5: set arrStats to []
	arrStats = [];
	// 6: set textStats to []
	textStats = [];
}

window.getNLP = function() {
		// get array of stats from text
		textStats= [];
		// 1: create t0 and set to performance.now()
		var t0 = performance.now();
		// 2: set textMetrics by using computeNLP function
		textMetrics = computeNLP();
		// 3: create t1 and set to performance.now()
		var t1 = performance.now();
		// 4: display NLP tool (t1-t0) milliseconds in the nlpTime element on form  
		document.getElementById("nlpTime").innerText = "NLP tool " + (t1-t0) + " milliseconds";
}

window.drawText = function() {
	try {
		
		// 1: set nPoints to the value in the numPoints form field
		nPoints = parseInt(document.getElementById("numPoints").value);
		// 2: if nPoints is less than 0 then set to 0
		if (nPoints < 0) {
			nPoints = 0;
		}
		// 3: set pathSegments to 1.1 * the length of textMetrics	
		pathSegments = 1.1 * textMetrics.length;	
		// 4: set nAlgo to the value of numAlgo -- you may need to use the function parseInt
		nAlgo = parseInt(document.getElementById("numAlgo").value);
		// 5: if nAlgo is less than 0 then set to 0
		if (nAlgo <0) {
			nAlgo = 0;
		}

		// set interval
		dotInterval = setInterval(addDotInterval, 20);
		
	} catch(err) {
		alert(err.message);
	}
}
