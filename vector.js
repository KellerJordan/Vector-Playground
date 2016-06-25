var wW=$(window).width()-18;
var wH=$(window).height()-18;
$("svg").attr("width",wW).attr("height",wH);

var scX=1000, myX=25, myY=25, myZ=25, rotY=0, rotZ=0, rotY0=Math.PI/4, rotZ0=-Math.PI/4;
var ogn=[0,0,0],i=[1,0,0],j=[0,1,0],k=[0,0,1];

function pMod(coord,x){return(coord*scX/x);}

function getPoint(point){
	var x=-1*(point[0]-myX), y=point[1]-myY, z=-1*(point[2]-myZ);
	var y2=y*Math.cos(rotY)+x*Math.sin(rotY);
	var x2=x*Math.cos(rotY)-y*Math.sin(rotY);
	var z2=z*Math.cos(rotZ)+x2*Math.sin(rotZ);
	var x2=x2*Math.cos(rotZ)-z*Math.sin(rotZ);
	return [pMod(y2,x2),pMod(z2,x2)];
}

//could add checks for vectors same dimension
function vAdd(v1,v2){var result=[];for(var i in v1){result.push(v1[i]+v2[i])}return result}

function vSubtract(v1,v2){var result=[];for(var i in v){result.push(v1[i]-v2[i])}return result}

function vMultiply(v,s){var result=[];for(var i in v){result.push(s*v[i])}return result}

function vDotProduct(v1,v2){var result=0;for(var i in v1){result+=v1[i]*v2[i]}return result}

//only 3 dimensions
function vCrossProduct(v1,v2){return [mDeterminant([[v1[1],v1[2]],[v2[1],v2[2]]]),-1*mDeterminant([[v1[0],v1[2]],[v2[0],v2[2]]]),mDeterminant([[v1[0],v1[1]],[v2[0],v2[1]]])]}

function vDistance(v){return Math.sqrt(vDotProduct(v,v))}

class line{
	constructor(p,v){
		this.p=p, this.v=v;
		this.drawnLine=document.createElementNS("http://www.w3.org/2000/svg","line");
		$("svg").append(this.drawnLine);
	}
	draw(color){
		var p1=getPoint(this.p), p2=getPoint(vAdd(this.p,this.v));
		$(this.drawnLine).attr("x1",p1[0]+wW/2).attr("y1",p1[1]+wH/2).attr("x2",p2[0]+wW/2).attr("y2",p2[1]+wH/2);
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