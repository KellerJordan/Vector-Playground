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

// plot(function(x,y){return [x,y,Math.cos(x+y)+x*x/6+y*y/6]},-10,10);
// plot(function(x,y){return [x,y,Math.sqrt(y*y-x*x)]},-5,5);
// plot(function(x,y){return [x,y,Math.sqrt(2*x-x*x)]},-5,5);

plot(function(r, t){ return [r * Math.cos(t), r * Math.sin(t), Math.sin(5/r)] }, [0, 1.5], [0, 2 * Math.PI]);