var wW=$(window).width()-18;
var wH=$(window).height()-18;
$("svg").attr("width",wW).attr("height",wH);

var scX=1000, myX=25, myY=25, myZ=25, rotY=0, rotZ=0, rotY0=Math.PI/4, rotZ0=-Math.PI/4;
var ogn={x:0,y:0,z:0},i={x:1,y:0,z:0},j={x:0,y:1,z:0},k={x:0,y:0,z:1};

function pMod(coord,x){return(coord*scX/x);}

function getPoint(point){
	var x=-1*(point.x-myX), y=point.y-myY, z=-1*(point.z-myZ);
	var y2=y*Math.cos(rotY)+x*Math.sin(rotY);
	var x2=x*Math.cos(rotY)-y*Math.sin(rotY);
	var z2=z*Math.cos(rotZ)+x2*Math.sin(rotZ);
	var x2=x2*Math.cos(rotZ)-z*Math.sin(rotZ);
	return {x:pMod(y2,x2),y:pMod(z2,x2)};
}

function vAdd(v1,v2){return {x:v1.x+v2.x,y:v1.y+v2.y,z:v1.z+v2.z}}

function vSubtract(v1,v2){return {x:v1.x-v2.x,y:v1.y-v2.y,z:v1.z-v2.z}}

function vMultiply(v,s){return {x:s*v.x,y:s*v.y,z:s*v.z}}

function vDotProduct(v1,v2){return {x:v1.x*v2.x,y:v1.y*v2.y,z:v1.z*v2.z}}

function vCrossProduct(v1,v2){return {x:mDeterminant([[v1.y,v1.z],[v2.y,v2.z]]),y:-1*mDeterminant([[v1.x,v1.z],[v2.x,v2.z]]),z:mDeterminant([[v1.x,v1.y],[v2.x,v2.y]])}}

function vDistance(v){d=vDotProduct(v,v);return Math.sqrt(d.x+d.y+d.z);}

class line{
	constructor(p,v){
		this.p=p, this.v=v;
		this.drawnLine=document.createElementNS("http://www.w3.org/2000/svg","line");
		$("svg").append(this.drawnLine);
	}
	draw(color){
		var p1=getPoint(this.p), p2=getPoint(vAdd(this.p,this.v));
		$(this.drawnLine).attr("x1",p1.x+wW/2).attr("y1",p1.y+wH/2).attr("x2",p2.x+wW/2).attr("y2",p2.y+wH/2);
		if(color){$(this.drawnLine).css("stroke",color);}
	}
}

class pGram{
	constructor(v1,v2){
		this.line1=new line(ogn,v1);
		this.line2=new line(ogn,v2);
		this.line3=new line(v1,v2);
		this.line4=new line(v2,v1);
	}
	draw(){
		this.line1.draw();
		this.line2.draw();
		this.line3.draw();
		this.line4.draw();
	}
}