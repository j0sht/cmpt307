let denoms = [1, 5, 10, 25, 100];
let n = 57;
let k = denoms.length;

let A = [];
for (let i = 0; i < k+1; i++) {
  let j_array = [];
  for (let j = 0; j < n+1; j++) {
    j_array.push(undefined);
  }
  A.push(j_array);
}

// Initialize A
for (let i = 1; i < k+1; i++) {
  A[i][0] = 0;
  
}
for (let j = 0; j < n+1; j++) {
  A[0][j] = Infinity;
}

// Populate A with optimal values
for (let i = 1; i < k+1; i++) {
  let d = denoms[i-1];
  for (let j = 1; j < n+1; j++) {
    if (j < d) {
      A[i][j] = A[i-1][j];
    } else {
      A[i][j] = Math.min(A[i-1][j], 1 + A[i][j-d]);
    }
  }
}

// Print optimal multiset of coins
const PrintOpt = (i, j) => {
  if (j === 0) {
    return;
  }
  if (A[i][j] === A[i-1][j]) {
    PrintOpt(i-1, j);
  } else {
    let d = denoms[i-1];
    PrintOpt(i, j-d)
    console.log("+ coin of denomination " + d);
  }
};

console.log(A);
console.log("Optimal number of coins: " + A[k][n]);
PrintOpt(k, n);
