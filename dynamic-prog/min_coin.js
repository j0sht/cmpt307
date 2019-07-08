/*
 * The minimum consists of finding the minimum number of coins needed to
 * make a particular amount of cents using a given amount of set
 * denominations (d1, ..., dn)
 *
 * Ex) US has d1 = 1, d2 = 5, d3 = 10, d4 = 25
 *     to make 36 cents, can use 1 quarter (25), 1 dime (10), and 1 penny (1)
 *
 * The min-coin change solution consists of finding the minimum number of
 * coins for n. But to do this, first need to find the solution for every
 * x < n, then can build up the solution out of the solutions for smaller
 * values.
 *
 */

// coins  --> The denominations (ex. [1, 5, 10, 25])
// amount --> The amount n
const minCoinChange = (coins, amount) => {
  // Cache is used to store previously calculated values -- memoization
  const cache =  [];

  // makeChange is a recursive function that solves the problem for us
  const makeChange = (value) => {

    // If value is not positive, return empty array
    if (value < 0) {
      return [];
    }

    // If result is already cached, return its value
    if (cache[value]) {
      return cache[value];
    }


    let min = []; // minimum amount of coins
    let newMin;
    let newAmount;
    for (let i = 0; i < coins.length; i++) {
      const coin = coins[i];
      // For each coin, we calculate a new amount, which decreases the
      // value until we reach the minimum amount of change we can give
      newAmount = value - coin;

      // If newAmount is positive, find its result
      if (newAmount >= 0) {
	newMin = makeChange(newAmount);
      }

      // Check whether newAmount is valid, whether min is the best result,
      // and whether min and newAmount are valid values
      if (newAmount >= 0
	  && (newMin.length < min.length-1 || !min.length)
	  && (newMin.length || !newAmount)) {

	// If all verifications are positive, we have a better result
	// then before,
	min = [coin].concat(newMin);
	console.log('newMin ' + min + ' for ' + value);
      }
    }
    // Store optimal result
    cache[value] = min;
    // Return the result
    return min;
  };
  console.log(cache);
  return makeChange(amount);
};

console.log(minCoinChange([1,5,10,25], 36));
console.log(minCoinChange([1,3,4], 6));
