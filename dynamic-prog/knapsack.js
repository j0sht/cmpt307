/*
 * The Knapsack Problem: A combinatorial optimization problem
 * 
 * Given a fixed-size knapsack with a capacity to carry W amount of weight
 * and a set of items that have a value and a weight, find the best
 * solution in a way to fill the knapsack with the most valuable items so
 * that the total weight is <= W.
 */

function knapSack(capacity, weights, values, n) {
  // matrix kS is of dimensions (n+1) * (capacity+1)
  // n ==> The number of values (lenght of values)
  // capacity ==> max weight W
  // i.e.) kS[n+1][capacity+1]
  const kS = [];
  for (let i = 0; i <= n; i++) {
    kS[i] = [];
  }

  // Iterate through each value
  for (let i = 0; i <= n; i++) {
    // Iterate through weight 0 to capacity
    for (let w = 0; w <= capacity; w++) {

      if (i === 0 || w === 0) {
	// Ignore first column and row of kS
	kS[i][w] = 0;

      } else if (weights[i-1] <= w) {
	// Item i can only be part of the solution if its weight <= W

	const itemValue = values[i-1];
	const itemWeight = weights[i-1];
	const kSWeight = w;
	const wDiff = kSWeight - itemWeight;

	const a = itemValue + kS[i-1][wDiff];
	const b = kS[i-1][w];

	// Compare current value and previous value for same weight,
	// and choose the max
	kS[i][w] = Math.max(a,b);

      } else {
	// If item i has weight > W, place value from previous row
	kS[i][w] = kS[i-1][w];
      }
    }
  }

  findValues(n, capacity, kS, weights, values);

  // The solution is found in the last cell of the matrix
  return kS[n][capacity];
}

// Prints the items that are part of the solution
function findValues(n, capacity, kS, weights, values) {
  let i = n;
  let k = capacity;
  console.log('Items that are part of the solution:');
  while (i > 0 && k > 0) {
    if (kS[i][k] !== kS[i-1][k]) {
      console.log(`item ${i}: w=${weights[i-1]}, v=${values[i-1]}`);
      i--;
      k -= kS[i][k];
    } else {
      i--;
    }
  }
}

const values = [3,4,5];
const weights = [2,3,4];
const capacity = 5;
const n = values.length;
const sol = knapSack(capacity, weights, values, n);
console.log("Total value that can be carried:", ''+sol);
