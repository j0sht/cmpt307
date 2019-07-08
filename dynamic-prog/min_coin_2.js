let denoms = [1, 5, 10, 25, 100];
let n = 57;
let k = denoms.length;

let A = [];
for (let i = 0; i <= k; i++) {
  let j_array = [];
  for (let j = 0; j <= n; j++) {
    j_array.push(undefined);
  }
  A.push(j_array);
}

// Initialize A
for (let i = 1; i <= k; i++) {
  A[i][0] = 0;
}
for (let j = 0; j <= n; j++) {
  A[0][j] = Infinity;
}

// Populate A with optimal values
for (let i = 1; i <= k; i++) {
  let d = denoms[i-1];
  for (let j = 1; j <= n; j++) {
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

const PrintOptIter = (k, n) => {
  let i = k;
  let j = n;
  let coins = [];
  while (j > 0) {
    if (A[i][j] === A[i-1][j]) {
      i -= 1;
    } else {
      let d = denoms[i-1];
      coins.push(d);
      j -= d;
    }
  }
  let s = "";
  for (let i = 0; i < coins.length; i++) {
    s += (i === coins.length-1) ? coins[i] : coins[i] + " + ";
  }
  console.log(s);
};

let s = denoms.reduce(function(acc, curr) {
  if (curr === denoms[denoms.length-1]) {
    return acc + curr;
  } else {
    return acc + curr + ", ";
  }
}, "");

console.log("Coins:", s);
console.log("Amount:", ''+n);
console.log("Optimal number of coins: " + A[k][n]);
PrintOptIter(k, n);
