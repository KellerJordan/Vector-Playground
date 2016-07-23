function cMultiply(v1,v2){
	return [v1[0]*v2[0]-v1[1]*v2[1],v1[0]*v2[1]+v1[1]*v2[0]];
}

function cPlot(v){
	drawList.push(new line(ogn,[v[0],v[1],0]));
}