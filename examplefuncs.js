// drawing axes with length bound
var bound=10;
var drawList=[new line([-.1*bound,0,0],[1.1*bound,0,0]), new line([0,-.1*bound,0],[0,1.1*bound,0]), new line([0,0,-.1*bound],[0,0,1.1*bound])];

// var vect1=[10,6,7], vect2=[-9,10,8];
// var vect3=vCrossProduct(vect1,vect2);
// drawList.push(new line(ogn,vect3));
// drawList.push(new pGram(vect1,vect2));
// arb=50;
// for(var i=0;i<arb;i++){drawList.push(new line(ogn,rotatePoint([100,0,0],i*Math.PI/(arb/2),0)))}
// square(ogn,30);fractal(ogn,10);

// function f(x,y){

// }

// function graph2(func,z){

// }

// function graph3(func){
// 	if(func.length==1){graph2(func,0);}
// }

function plotPath(func,step,max){
	var curr;
	var prev=func(0);
	for(var t=step;t<max;t+=step){
		curr=func(t);
		drawList.push(new line(prev,vSubtract(curr,prev)));
		prev=curr;
	}
}

function plotSurface(func,max){
	var step=max/15;
	for(var s=-1*max;s<max;s+=step){
		var curr;
		var prev=func(s,-1*max);
		for(var t=-1*max+step;t<max;t+=step){
			curr=func(s,t);
			if(isValid(prev)&&isValid(curr)){drawList.push(new line(prev,vSubtract(curr,prev)));}
			// drawList.push(new line(prev,vSubtract(curr,prev)));
			prev=curr;
		}
		var prev=func(-1*max,s);
		for(var t=-1*max+step;t<max;t+=step){
			curr=func(t,s);
			if(isValid(prev)&&isValid(curr)){drawList.push(new line(prev,vSubtract(curr,prev)));}
			// drawList.push(new line(prev,vSubtract(curr,prev)));
			prev=curr;
		}
	}
}

function isValid(point){
	for(var i in point){if(isNaN(point[i])){return false;}}
	return true;
}

// var cvect1=[2,2];
// var cvect2=[2,5];
// cPlot(cvect1);
// cPlot(cvect2);
// cPlot(cMultiply(cvect1,cvect2));

// plotSurface(function(x,y){return [x,y,Math.cos(x+y)+x*x/6+y*y/6]},20);
plotSurface(function(x,y){return [x,y,x*x+y*y+2*x*y]},2);
// drawList.push(new line(ogn,[8,12,8],"red"));