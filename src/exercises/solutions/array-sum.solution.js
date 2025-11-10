/**
 * Solution: Array Sum
 */

export function sumArray(arr) {
  // Solution 1: Using reduce
  return arr.reduce((sum, num) => sum + num, 0);
  
  // Solution 2: Using a loop
  // let sum = 0;
  // for (const num of arr) {
  //   sum += num;
  // }
  // return sum;
}
