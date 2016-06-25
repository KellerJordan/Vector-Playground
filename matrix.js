function mAdd(m1,m2){
	if(!(m1[0].length==m2[0].length&&m1.length==m2.length)){return "incompatible dimensions"}
	var result=[];
	for(var i=0;i<m1.length;i++){
		result.push(vAdd(m1[i],m2[i]));
	}
	return result;
}

function mDeterminant(m){
	var d=0;
	if(m.length==2){
		return m[0][0]*m[1][1]-m[0][1]*m[1][0];
	}
	for(var i in m[0]){
		d+=Math.pow(-1,i)*m[0][i]*mDeterminant(mSplice(m.slice(1),i))
	}
	return d;
}

// function mInvert(){
	
// }

function mSplice(m,missingCol){
	subMatrix=[];
	for(var i in m){
		subMatrix.push([]);
		for(var j in m[i]){
			if(!(j==missingCol)){
				subMatrix[i].push(m[i][j]);
			}
		}
	}
	return subMatrix;
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