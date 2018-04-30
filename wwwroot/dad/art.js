var dots = new Group;
var paths = new Group;
var centerY = document.getElementById('divOutput').clientHeight / 2;
var centerX = document.getElementById('divOutput').clientWidth / 2;

function addDotInterval() {
	try {
		var maxSent = textMetrics.length;
		
		if (numItems < maxSent) {
			addDot(textMetrics[numItems]);
		} else {
			clearInterval(dotInterval);
			document.getElementById('nlpStats').innerText = numItems;
		}
	} catch(err) {
		alert(err.message);
	}
}

function addDot(v) {
	//v will be the values from the NLP part
	try {
		var d = getDot(v);	
		d.rotate(137.5*(numItems-1));
		
		var l = new Path();
		
		d.fillColor = getColor(v);
		d.strokeColor = new Color(0.8, 0.8, 0.8);
		d.strokeWidth = 1;
		
		// sentiment drives stroke?
		l.strokeColor = 'black';
		l.strokeWidth = 0;
		
		l.add(new Point(centerX, centerY));
		l.add(new Point(centerX, 0));
		l.rotate(137.5*(numItems-1), new Point(centerX,centerY));
	
		d.bringToFront();
		d.position = l.getPointAt(0);

		numItems++;
		moveDots();	
		
		dots.appendTop(d);
		paths.appendTop(l);

	} catch(err) {
		alert(err.message);
	}
}

function getColor(v) {
	var optColor = nAlgo;
	var iRed=0, iGreen=0, iBlue=0;
	var pNoun=0, pVerb=0, pAdjAdv=0;
	var iAlpha = 1; 
	var s = getSentValue(v[11]);
	pNoun = v[15];
	pVerb = v[14];
	pAdjAdv = v[13];

	switch (optColor) {
		case 0:
			iAlpha = 0.75 - (s/12);
	
			if ((v[15]-(1/3)) >= 0) {
				pNoun = ((v[15]-(1/3)) / (2/3) * 0.5) + 0.5;
			} else {
				pNoun = 0.5 - ((v[15]-(1/3)) / (1/3) * 0.5);
			}
	
			if ((v[14]-(1/3)) >= 0) {
				pVerb = ((v[14]-(1/3)) / (2/3) * 0.5) + 0.5;
			} else {
				pVerb = 0.5 - ((v[14]-(1/3)) / (1/3) * 0.5);
			}
	
			if ((v[13]-(1/3)) >= 0) {
				pAdjAdv = ((v[13]-(1/3)) / (2/3) * 0.5) + 0.5;
			} else {
				pAdjAdv = 0.5 - ((v[13]-(1/3)) / (1/3) * 0.5);
			}

			iRed = pAdjAdv;
			iGreen = pVerb;
			iBlue = pNoun;
			break;
		case 1:
			// 3/2 and 4/1

			iAlpha = 0.75 - (s/12);
			//iAlpha = 0.5 - (s/6);
			pNoun = v[15];
			pVerb = v[14];
			pAdjAdv = v[13];
			iRed = pAdjAdv;
			iGreen = pVerb;
			iBlue = pNoun;
			break;
		case 2:
			// if quotation then make Alpha = 0.7 else 1.0
			
			if (v[9] == 0) {iAlpha=1;} else {iAlpha = 0.4;}
			if (s < 0) { iRed = -(s/3);} 
			if (s > 0) { iGreen = s/3;}
			iBlue = pAdjAdv;
			break;
		case 3:
			if (v[9] == 0) {iAlpha=1;} else {iAlpha = 0.4;}
			if (s < 0) { iRed = -(s/3);} 
			if (s > 0) { iGreen = s/3;}
			iBlue = pAdjAdv + pVerb;
			break;
	}

	var newColor = new Color(iRed, iGreen, iBlue, iAlpha);
		
	return newColor;
}



function moveDots() {
	try {
		// Iterate through the items contained within the array:
		for (var i = 0; i < dots.children.length; i++) {
			offset = ((numItems - i) / pathSegments) * paths.children[i].length;
			dots.children[i].position = paths.children[i].getPointAt(offset);
		}
		
	} catch(err) {
		alert(err.message);
	}
	
}

function getDot(v) {
	var r = minR+v[0];
	if (r > maxR) {r = maxR;}  //cap size of dot
	var center = new Point(centerX, centerY);
	
	//if sentiment is 0 then use circle
	if (nPoints==0 || nPoints==1) {
		var newDot = new Path.Circle({radius: r});	
	} else if (nPoints == 3) {
		var newDot = new Path.RegularPolygon(center, 3, r);
	} else {
		var newDot = new Path.Star(center, nPoints, r-(1.5*nPoints), r);
	}
	
	return newDot;
}

function getSentValue(c) {
	var sentValue = 0;
	if (c > 3) {
		sentValue = 3;
	} else if (c < -3) {
		sentValue = -3;
	} else {
		sentValue = c;
	}
	return sentValue;
}



window.clearArt = function() {
	clearCanvas('myCanvas'); 
	numItems=0;
	dots.removeChildren();
	paths.removeChildren();	
	arrStats = []; 
	textStats = [];

}

window.getNLP = function() {
		// get array of stats from text
		var t0 = performance.now();
		textMetrics = computeNLP();
		var t1 = performance.now();
		document.getElementById('nlpTime').innerText = "NLP took " + (t1-t0) + " milliseconds";
}

window.drawText = function() {
	try {

		nPoints = parseInt(document.getElementById('numPoints').value);
		if (nPoints < 0) {nPoints = 0;}
		alert('nPoints: ' + nPoints);
		
		pathSegments = 1.1*textMetrics.length;

		nAlgo = parseInt(document.getElementById('numAlgo').value);
		if (nAlgo < 0) {nAlgo = 0;}

		// set interval
		dotInterval = setInterval(addDotInterval, 20);

		
	} catch(err) {
		alert(err.message);
	}
}
