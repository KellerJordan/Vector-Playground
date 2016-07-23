var wW=$(window).width()-18;
var wH=$(window).height()-18;
$("svg").attr("width",wW).attr("height",wH);

var scX=1000, rotY=0, rotZ=0, rotY0=-Math.PI/4, rotZ0=Math.PI/4;
// rotY0=0,rotZ0=0;
var myX=50, myY=25, myZ=25;
var ogn=[0,0,0],i=[1,0,0],j=[0,1,0],k=[0,0,1];

function pMod(coord,x){
	if(x>0){return -1000*coord*scX/x}
	return(coord*scX/x);
}

function getPoint(point){
	var x2=point[0]-myX,y=point[1],z=point[2];

	// code if rotY and rotZ are of user camera rather than coordinate plane
	// var x=-1*(point[0]-myX), y=point[1]-myY, z=-1*(point[2]-myZ);
	// var y2=y*Math.cos(rotY)+x*Math.sin(rotY);
	// var x2=x*Math.cos(rotY)-y*Math.sin(rotY);
	// var z2=z*Math.cos(rotZ)+x2*Math.sin(rotZ);
	// var x2=x2*Math.cos(rotZ)-z*Math.sin(rotZ);

	return [-1*pMod(y,x2),pMod(z,x2)];
}

function rotatePoint(p,y,z){
	if(!y){y=rotY}if(!z){z=rotZ}
	var pPoint=vPolar(p);
	var rPoint=vRectangular([pPoint[0],pPoint[1]+y,pPoint[2]]);
	pPoint=vPolar([rPoint[0],rPoint[2],rPoint[1]]);
	var rPoint=vRectangular([pPoint[0],pPoint[1]-z,pPoint[2]]);
	return [rPoint[0],rPoint[2],rPoint[1]];
}

class line{
	constructor(p,v,c){
		this.p=p, this.v=v, this.c=c;
		this.drawnLine=document.createElementNS("http://www.w3.org/2000/svg","line");
		$("svg").append(this.drawnLine);
	}
	draw(color){
		var p1=getPoint(rotatePoint(this.p)), p2=getPoint(rotatePoint(vAdd(this.p,this.v)));
		$(this.drawnLine).attr("x1",p1[0]+wW/2).attr("y1",p1[1]+wH/2).attr("x2",p2[0]+wW/2).attr("y2",p2[1]+wH/2);
		if(color){
			$(this.drawnLine).css("stroke",color);
		}else if(this.c){
			$(this.drawnLine).css("stroke",this.c);
		}
	}
}