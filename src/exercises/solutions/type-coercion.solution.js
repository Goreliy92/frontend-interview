/**
 * Solution: Type Coercion (== vs ===)
 */

export function looseEqualityTests() {
  return {
    // Number vs String: "1" is coerced to 1
    numberString: 1 == "1",           // true
    
    // Boolean vs Number: true is coerced to 1
    booleanNumber: true == 1,         // true
    
    // Null vs Undefined: special case, they're loosely equal
    nullUndefined: null == undefined, // true
    
    // String vs Boolean: "0" -> 0, false -> 0
    stringBoolean: "0" == false,      // true
    
    // Empty string is coerced to 0
    emptyStringZero: "" == 0,         // true
    
    // true -> 1, "1" -> 1
    trueString: true == "1",          // true
    
    // Array toString() is called: [1,2] -> "1,2"
    arrayString: [1, 2] == "1,2",     // true
    
    // Empty array -> "", "" -> 0
    emptyArrayZero: [] == 0,          // true
  };
}

export function strictEqualityTests() {
  return {
    // Different types, no coercion
    numberString: 1 === "1",           // false
    
    // Different types
    booleanNumber: true === 1,         // false
    
    // Different types (null and undefined are different)
    nullUndefined: null === undefined, // false
    
    // Different types
    stringBoolean: "0" === false,      // false
    
    // Different types
    emptyStringZero: "" === 0,         // false
    
    // Same type and value
    numberNumber: 1 === 1,             // true
    stringString: "hello" === "hello", // true
  };
}

export function compareValues(a, b, strict = true) {
  if (strict) {
    return a === b; // Strict equality
  } else {
    return a == b;  // Loose equality
  }
}

export function explainCoercion() {
  return {
    numberStringExplanation: 
      "String '1' is converted to number 1 before comparison, so 1 == 1 returns true",
    
    nullUndefinedExplanation: 
      "null and undefined are considered loosely equal by design in JavaScript spec. They only equal each other with ==",
    
    stringBooleanExplanation: 
      "String '0' is converted to number 0, false is converted to number 0, so 0 == 0 returns true",
    
    bestPractice: 
      "Always use === (strict equality) unless you specifically need type coercion. It's more predictable and avoids bugs",
  };
}

export function checkNullOrUndefined(value) {
  // Fixed version: use === to check explicitly
  // Or use the intentional == null shorthand if you want both null and undefined
  return value === null || value === undefined;
  
  // Alternative (intentional use of ==):
  // return value == null; // This is actually the common idiom to check both
}

export function falsyVsLooseEquality() {
  return {
    // These falsy values are == false:
    // false -> false (obviously)
    // 0 -> false (0 is coerced to false)
    // "" -> false (empty string is coerced to 0, then to false)
    equalToFalse: [false, 0, ""],
    
    // These falsy values are NOT == false:
    // null != false
    // undefined != false  
    // NaN != anything (even itself!)
    notEqualToFalse: [null, undefined, NaN],
  };
}

export function findCoercionBug() {
  // Fixed version
  function isAdmin(userRole) {
    // Use === to prevent type coercion
    return userRole === "1";
  }
  
  return {
    stringOne: isAdmin("1"),    // true - correct!
    numberOne: isAdmin(1),      // false - fixed!
    booleanTrue: isAdmin(true), // false - fixed!
  };
}
