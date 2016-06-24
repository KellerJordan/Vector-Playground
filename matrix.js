function mDeterminant(matrix){
	var d=0;
	if(matrix.length==2){
		return matrix[0][0]*matrix[1][1]-matrix[0][1]*matrix[1][0];
	}
	for(i in matrix[0]){
		d+=Math.pow(-1,i)*matrix[0][i]*mDeterminant(mSplice(matrix.slice(1),i))
	}
	return d;
}

function mSplice(matrix,missingCol){
	subMatrix=[];
	for(i in matrix){
		subMatrix.push([]);
		for(j in matrix[i]){
			if(!(j==missingCol)){
				subMatrix[i].push(matrix[i][j]);
			}
		}
	}
	return subMatrix;
}