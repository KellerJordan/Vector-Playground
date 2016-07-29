// ALL

function add(u,v){
	if(!u[0]){ return u+v }else{
		if(u.length==v.length&&!(u[0].length==v[0].length)){ return "incompatible dimensions" }
		var result=[];
		for(var i=0;i<u.length;i++){
			result.push(add(u[i],v[i]));
		}
		return result;
	}
}

// MATRICES

// function mAdd(m1,m2){
// 	if(!(m1[0].length==m2[0].length&&m1.length==m2.length)){return "incompatible dimensions"}
// 	var result=[];
// 	for(var i=0;i<m1.length;i++){
// 		result.push(vAdd(m1[i],m2[i]));
// 	}
// 	return result;
// }

// function mDeterminant(m){
// 	if(m.length==2){return m[0][0]*m[1][1]-m[0][1]*m[1][0]}
// 	var result=0;
// 	for(var i in m[0]){result+=Math.pow(-1,i)*m[0][i]*mDeterminant(mSplice(m.slice(1),i))}
// 	return result;
// }

// function mSplice(m,missingCol){
// 	var result=[];
// 	for(var i in m){
// 		result.push([]);
// 		for(var j in m[i]){
// 			if(!(j==missingCol)){
// 				result[i].push(m[i][j]);
// 			}
// 		}
// 	}
// 	return result;
// }

// function mMultiply(m1,m2){
// 	if(!(m1[0].length==m2.length)){return "incompatible dimensions"}
// 	var result=[];
// 	for(var i=0;i<m1.length;i++){
// 		result.push([]);
// 		for(var j=0;j<m2[0].length;j++){
// 			var mult=[];
// 			for(var k=0;k<m2.length;k++){
// 				mult.push(m2[k][j]);
// 			}
// 			result[i].push(vDotProduct(m1[i],mult));
// 		}
// 	}
// 	return result;
// }


// // COMPLEX PLANE

// function cMultiply(v1,v2){
// 	return [v1[0]*v2[0]-v1[1]*v2[1],v1[0]*v2[1]+v1[1]*v2[0]];
// }

// function cPlot(v){
// 	drawList.push(new line(ogn,[v[0],v[1],0]));
// }


// // CALCULUS

// function cDerivative(func, pt){
// 	var arb=Math.pow(10,-10);
// 	var val=(func(pt+arb)-func(pt))/(arb);
// 	return val;
// }

// // function cIntegral(func, pt){
// // 	var arb=Math.pow(10,-10);
// // 	var val=(func(pt+arb)-func(pt))*(arb);
// // 	return val;
// // } incorrect


// // VECTORS

// //could add checks for vectors same dimension
// function vAdd(v1,v2){var result=[];for(var i in v1){result.push(v1[i]+v2[i])}return result}

// function vSubtract(v1,v2){var result=[];for(var i in v1){result.push(v1[i]-v2[i])}return result}

// function vMultiply(v,s){var result=[];for(var i in v){result.push(s*v[i])}return result}

// function vDotProduct(v1,v2){var result=0;for(var i in v1){result+=v1[i]*v2[i]}return result}

// function vCrossProduct(vArr){
// 	var r=[];
// 	for(var i = 0; i<vArr.length+1; i++){
// 		var d = mDeterminant(mSplice(vArr,i));
// 		if(i % 2){d *= -1}
// 		r.push(d);
// 	}
// 	return r;
// }

// function vDistance(v){return Math.sqrt(vDotProduct(v,v))}


// // COORDINATE SYSTEMS

// function vPolar(v){
// 	var p=[Math.sqrt(v[0]*v[0]+v[1]*v[1]),Math.atan2(v[1],v[0])];
// 	for(var i=2;i<v.length;i++){p.push(v[i])}
// 	return p;
// }

// function vRectangular(v){
// 	var r=[v[0]*Math.cos(v[1]),v[0]*Math.sin(v[1])];
// 	for(var i=2;i<v.length;i++){r.push(v[i])}
// 	return r;
// }


// // EXAMPLE SURFACES

// class pGram{
// 	constructor(v1,v2){
// 		this.line1=new line(ogn,v1);
// 		this.line2=new line(ogn,v2);
// 		this.line3=new line(v1,v2);
// 		this.line4=new line(v2,v1);
// 	}
// 	draw(){
// 		this.line1.draw();
// 		this.line2.draw();
// 		this.line3.draw();
// 		this.line4.draw();
// 	}
// }

// function fractal(c,r){
// 	square(c,r);
// 	if(r<30*Math.pow(3,-3)){return}
// 	fractal([c[0]-2*r,c[1]-2*r,c[2]],r/3);
// 	fractal([c[0],c[1]-2*r,c[2]],r/3);
// 	fractal([c[0]+2*r,c[1]-2*r,c[2]],r/3);
// 	fractal([c[0]+2*r,c[1],c[2]],r/3);
// 	fractal([c[0]+2*r,c[1]+2*r,c[2]],r/3);
// 	fractal([c[0],c[1]+2*r,c[2]],r/3);
// 	fractal([c[0]-2*r,c[1]+2*r,c[2]],r/3);
// 	fractal([c[0]-2*r,c[1],c[2]],r/3);
// }

// function square(c,s){
// 	var p1=[c[0]-s,c[1]-s,c[2]];
// 	var p2=[c[0]+s,c[1]-s,c[2]];
// 	var p3=[c[0]+s,c[1]+s,c[2]];
// 	var p4=[c[0]-s,c[1]+s,c[2]];
// 	drawList.push(new line(p1,vSubtract(p2,p1)));
// 	drawList.push(new line(p2,vSubtract(p3,p2)));
// 	drawList.push(new line(p3,vSubtract(p4,p3)));
// 	drawList.push(new line(p4,vSubtract(p1,p4)));
// }