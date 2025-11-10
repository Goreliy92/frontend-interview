/**
 * JavaScript Exercise: Type Coercion (== vs ===)
 * 
 * Task: Understand type coercion in JavaScript equality comparisons
 * 
 * JavaScript has two equality operators:
 * - == (loose equality): performs type coercion before comparison
 * - === (strict equality): no type coercion, compares value and type
 * 
 * Understanding the difference is crucial for avoiding bugs!
 */

/**
 * Predict results of loose equality (==) comparisons
 * @returns {Object} Object with comparison results
 */
export function looseEqualityTests() {
  // TODO: Fill in the expected results (true or false)
  // These are examples of type coercion with ==
  
  return {
    // Number vs String
    numberString: 1 == "1",           // ? (your answer: true or false)
    
    // Boolean vs Number
    booleanNumber: true == 1,         // ?
    
    // Null vs Undefined
    nullUndefined: null == undefined, // ?
    
    // String vs Boolean
    stringBoolean: "0" == false,      // ?
    
    // Empty string vs Number
    emptyStringZero: "" == 0,         // ?
    
    // Boolean vs String
    trueString: true == "1",          // ?
    
    // Array vs String
    arrayString: [1, 2] == "1,2",     // ?
    
    // Empty array vs Number
    emptyArrayZero: [] == 0,          // ?
  };
}

/**
 * Predict results of strict equality (===) comparisons
 * @returns {Object} Object with comparison results
 */
export function strictEqualityTests() {
  // TODO: Fill in the expected results (true or false)
  // No type coercion with ===
  
  return {
    // Number vs String
    numberString: 1 === "1",           // ? (your answer: true or false)
    
    // Boolean vs Number
    booleanNumber: true === 1,         // ?
    
    // Null vs Undefined
    nullUndefined: null === undefined, // ?
    
    // String vs Boolean
    stringBoolean: "0" === false,      // ?
    
    // Empty string vs Number
    emptyStringZero: "" === 0,         // ?
    
    // Same values and types
    numberNumber: 1 === 1,             // ?
    stringString: "hello" === "hello", // ?
  };
}

/**
 * Implement a function that checks equality with type awareness
 * @param {*} a - First value
 * @param {*} b - Second value
 * @param {boolean} strict - Use strict equality if true
 * @returns {boolean} - True if equal
 */
export function compareValues(a, b, strict = true) {
  // TODO: Implement comparison
  // If strict is true, use === (strict equality)
  // If strict is false, use == (loose equality)
  
  return false;
}

/**
 * Explain why these comparisons behave differently
 * @returns {Object} Explanations for coercion behavior
 */
export function explainCoercion() {
  return {
    // TODO: Fill in the explanations
    
    // Why does 1 == "1" return true?
    numberStringExplanation: "Your explanation here",
    
    // Why does null == undefined return true?
    nullUndefinedExplanation: "Your explanation here",
    
    // Why does "0" == false return true?
    stringBooleanExplanation: "Your explanation here",
    
    // When should you use == vs ===?
    bestPractice: "Your recommendation here",
  };
}

/**
 * Fix the buggy code that uses == incorrectly
 * @param {*} value - Value to check
 * @returns {boolean} - True if value is exactly null or undefined
 */
export function checkNullOrUndefined(value) {
  // TODO: Fix this function
  // Current (buggy): returns true for 0, false, "", etc.
  // Should only return true for null or undefined
  
  return value == null; // This has a bug due to type coercion!
}

/**
 * Demonstrate falsy values vs loose equality with false
 * @returns {Object} Test results
 */
export function falsyVsLooseEquality() {
  // These are ALL falsy (if (!value) returns true):
  const falsyValues = [false, 0, "", null, undefined, NaN];
  
  // TODO: Return which falsy values are == false
  // Hint: Not all falsy values are == false!
  
  return {
    // Which falsy values equal false with ==?
    equalToFalse: [], // Fill with values that are == false
    
    // Which falsy values don't equal false with ==?
    notEqualToFalse: [], // Fill with values that are != false
  };
}

/**
 * Practice: Find the bug caused by type coercion
 */
export function findCoercionBug() {
  // This function has a bug due to using == instead of ===
  
  function isAdmin(userRole) {
    // TODO: Fix the bug in this comparison
    // Currently returns true for userRole = 1 (number)
    // Should only return true for userRole = "1" (string)
    return userRole == "1";
  }
  
  // Test cases
  return {
    stringOne: isAdmin("1"),    // Should be true
    numberOne: isAdmin(1),      // Should be false (but currently true - BUG!)
    booleanTrue: isAdmin(true), // Should be false (but currently true - BUG!)
  };
}
