function mAdd(m1,m2){
	if(!(m1[0].length==m2[0].length&&m1.length==m2.length)){return "incompatible dimensions"}
	var result=[];
	for(var i=0;i<m1.length;i++){
		result.push(vAdd(m1[i],m2[i]));
	}
	return result;
}

function mDeterminant(m){
	if(m.length==2){return m[0][0]*m[1][1]-m[0][1]*m[1][0]}
	var result=0;
	for(var i in m[0]){result+=Math.pow(-1,i)*m[0][i]*mDeterminant(mSplice(m.slice(1),i))}
	return result;
}

function mSplice(m,missingCol){
	var result=[];
	for(var i in m){
		result.push([]);
		for(var j in m[i]){
			if(!(j==missingCol)){
				result[i].push(m[i][j]);
			}
		}
	}
	return result;
}

function mMultiply(m1,m2){
	if(!(m1[0].length==m2.length)){return "incompatible dimensions"}
	var result=[];
	for(var i=0;i<m1.length;i++){
		result.push([]);
		for(var j=0;j<m2[0].length;j++){
			var mult=[];
			for(var k=0;k<m2.length;k++){
				mult.push(m2[k][j]);
			}
			result[i].push(vDotProduct(m1[i],mult));
		}
	}
	return result;
}