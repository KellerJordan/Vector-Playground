function render() {
	for (var i in drawList)
		drawList[i].draw();
}

function setCoords() {
	wW = $(window).width() - 18;
	wH = $(window).height() - 18;
	wX = wW/2;
	wY = wH/2;
	$('svg').width(wW).height(wH);
}

// rotation adjustment, rendering events
$(window)
	.on("mousewheel", e => 
	{
		myX *= Math.pow(1.1, (e.originalEvent.wheelDelta / -120));
	})
	.on("mousemove", e => 
	{
		rotY = rotY0 - 3 * Math.PI/2 * (wX - e.clientX + 9) / wX;
		rotZ = rotZ0 - Math.PI/2 * (wY - e.clientY + 4.5) / wY;
		if (rotZ > Math.PI/2) rotZ = 1 * Math.PI / 2;
		if (rotZ < 0) rotZ = 0;
	})
	.on("keydown mousemove mousewheel", render)
	.on("resize", setCoords)
;


// 3DRENDER
var wW, wH, wX, wY;
setCoords();

var scX = 1000,
	rotY = 0,
	rotZ = 0,
	rotY0 = -Math.PI/4,
	rotZ0 = Math.PI/4;

var myX = 50,
	myY = 0,
	myZ = 0;

var ogn = [0, 0, 0], 
	i = [1, 0, 0],
	j = [0, 1, 0],
	k = [0, 0, 1];

// renders point assuming no angle change in perspective
function pMod(coord, x) {
	if(x > 0) return -1000 * coord * scX/x;
	else return coord * scX/x;
}

// returns point in screen coordinates from point in 3d coordinates
function getPoint(point) {
	var x2 = point[0] - myX,
		y = point[1],
		z = point[2];

	// code if rotY and rotZ are of user camera rather than coordinate plane
	// var x=-1*(point[0]-myX), y=point[1]-myY, z=-1*(point[2]-myZ);
	// var y2=y*Math.cos(rotY)+x*Math.sin(rotY);
	// var x2=x*Math.cos(rotY)-y*Math.sin(rotY);
	// var z2=z*Math.cos(rotZ)+x2*Math.sin(rotZ);
	// var x2=x2*Math.cos(rotZ)-z*Math.sin(rotZ);

	return [-1 * pMod(y, x2), pMod(z, x2)];
}

// adjusts any point to angle graph is rotated at
function rotatePoint(p, y, z) {
	if (!y) y = rotY;
	if (!z) z = rotZ;
	var pPoint = vPolar(p);
	var rPoint = vRectangular([pPoint[0], pPoint[1] + y, pPoint[2]]);
	pPoint = vPolar([rPoint[0], rPoint[2], rPoint[1]]);
	var rPoint = vRectangular([pPoint[0], pPoint[1] - z, pPoint[2]]);
	return [rPoint[0], rPoint[2], rPoint[1]];
}

class line {
	constructor (p, v, c) {
		this.p = p, this.v = v, this.c = c;
		this.drawnLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
		$("svg").append(this.drawnLine);
	}
	draw(color) {
		var p1 = getPoint(rotatePoint(this.p)),
			p2 = getPoint(rotatePoint(add(this.p, this.v)));
		$(this.drawnLine)
			.attr("x1", p1[0] + wX)
			.attr("y1", p1[1] + wY)
			.attr("x2", p2[0] + wX)
			.attr("y2", p2[1] + wY);
		if (color)
			$(this.drawnLine).css("stroke", color);
		else if (this.c)
			$(this.drawnLine).css("stroke", this.c);
	}
}


// PLOTTING

function plotPath(func, x0, x1) {
	var steps = 30;

	var curr, prev;
	var diff = x1-x0;
	for (var t = x0; t < x1; t += diff/steps) {
		curr = func(t);
		if (isValid(prev) && isValid(curr)) {
			drawList.push(new line(prev, add(curr, mult(prev, -1))));
		}
		prev = curr;
	}
}

function plotSurface(func, r1, r2) {
	var steps = 30;

	var diff = r1[1] - r1[0];
	for (var s = r1[0]; s < r1[1]; s += diff/steps)
		plotPath(t => func(s, t), r2[0], r2[1]);

	var diff = r2[1] - r2[0];
	for (var s = r2[0]; s < r2[1]; s += diff/steps)
		plotPath(t => func(t, s), r1[0], r1[1]);
}

function plot(func, r1, r2) {
	if (func.length == 1)
		plotPath(func, r1, r2);
	else if (func.length == 2)
		plotSurface(func, r1, r2);
}

function isValid(point) {
	if (!point) return false;
	for (var i in point)
		if (isNaN(point[i])) return false;
	return true;
}