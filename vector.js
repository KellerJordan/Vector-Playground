//could add checks for vectors same dimension
function vAdd(v1,v2){var result=[];for(var i in v1){result.push(v1[i]+v2[i])}return result}

function vSubtract(v1,v2){var result=[];for(var i in v1){result.push(v1[i]-v2[i])}return result}

function vMultiply(v,s){var result=[];for(var i in v){result.push(s*v[i])}return result}

function vDotProduct(v1,v2){var result=0;for(var i in v1){result+=v1[i]*v2[i]}return result}

//only 3 dimensions
function vCrossProduct(v1,v2){return [mDeterminant([[v1[1],v1[2]],[v2[1],v2[2]]]),-1*mDeterminant([[v1[0],v1[2]],[v2[0],v2[2]]]),mDeterminant([[v1[0],v1[1]],[v2[0],v2[1]]])]}

function vDistance(v){return Math.sqrt(vDotProduct(v,v))}

function vPolar(v){
	var p=[Math.sqrt(v[0]*v[0]+v[1]*v[1]),Math.atan2(v[1],v[0])];
	for(var i=2;i<v.length;i++){p.push(v[i])}
	return p;
}

function vRectangular(v){
	var r=[v[0]*Math.cos(v[1]),v[0]*Math.sin(v[1])];
	for(var i=2;i<v.length;i++){r.push(v[i])}
	return r;
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


function fractal(c,r){
	square(c,r);
	if(r<30*Math.pow(3,-3)){return}
	fractal([c[0]-2*r,c[1]-2*r,c[2]],r/3);
	fractal([c[0],c[1]-2*r,c[2]],r/3);
	fractal([c[0]+2*r,c[1]-2*r,c[2]],r/3);
	fractal([c[0]+2*r,c[1],c[2]],r/3);
	fractal([c[0]+2*r,c[1]+2*r,c[2]],r/3);
	fractal([c[0],c[1]+2*r,c[2]],r/3);
	fractal([c[0]-2*r,c[1]+2*r,c[2]],r/3);
	fractal([c[0]-2*r,c[1],c[2]],r/3);
}

function square(c,s){
	var p1=[c[0]-s,c[1]-s,c[2]];
	var p2=[c[0]+s,c[1]-s,c[2]];
	var p3=[c[0]+s,c[1]+s,c[2]];
	var p4=[c[0]-s,c[1]+s,c[2]];
	drawList.push(new line(p1,vSubtract(p2,p1)));
	drawList.push(new line(p2,vSubtract(p3,p2)));
	drawList.push(new line(p3,vSubtract(p4,p3)));
	drawList.push(new line(p4,vSubtract(p1,p4)));
}