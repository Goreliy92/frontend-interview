import { describe, it, expect } from 'vitest';
import { 
  looseEqualityTests, 
  strictEqualityTests, 
  compareValues,
  checkNullOrUndefined,
  falsyVsLooseEquality,
  findCoercionBug
} from './type-coercion.js';

describe('Type Coercion (== vs ===)', () => {
  describe('looseEqualityTests', () => {
    it('should correctly predict loose equality results', () => {
      const results = looseEqualityTests();
      
      expect(results.numberString).toBe(true); // 1 == "1"
      expect(results.booleanNumber).toBe(true); // true == 1
      expect(results.nullUndefined).toBe(true); // null == undefined
      expect(results.stringBoolean).toBe(true); // "0" == false
      expect(results.emptyStringZero).toBe(true); // "" == 0
      expect(results.trueString).toBe(true); // true == "1"
      expect(results.arrayString).toBe(true); // [1,2] == "1,2"
      expect(results.emptyArrayZero).toBe(true); // [] == 0
    });
  });

  describe('strictEqualityTests', () => {
    it('should correctly predict strict equality results', () => {
      const results = strictEqualityTests();
      
      expect(results.numberString).toBe(false); // 1 === "1"
      expect(results.booleanNumber).toBe(false); // true === 1
      expect(results.nullUndefined).toBe(false); // null === undefined
      expect(results.stringBoolean).toBe(false); // "0" === false
      expect(results.emptyStringZero).toBe(false); // "" === 0
      expect(results.numberNumber).toBe(true); // 1 === 1
      expect(results.stringString).toBe(true); // "hello" === "hello"
    });
  });

  describe('compareValues', () => {
    it('should use strict equality by default', () => {
      expect(compareValues(1, 1)).toBe(true);
      expect(compareValues(1, "1")).toBe(false);
      expect(compareValues(true, 1)).toBe(false);
    });

    it('should use loose equality when strict is false', () => {
      expect(compareValues(1, "1", false)).toBe(true);
      expect(compareValues(true, 1, false)).toBe(true);
      expect(compareValues(null, undefined, false)).toBe(true);
    });

    it('should use strict equality when strict is true', () => {
      expect(compareValues(1, "1", true)).toBe(false);
      expect(compareValues(true, 1, true)).toBe(false);
      expect(compareValues(null, undefined, true)).toBe(false);
    });
  });

  describe('checkNullOrUndefined', () => {
    it('should return true only for null and undefined', () => {
      expect(checkNullOrUndefined(null)).toBe(true);
      expect(checkNullOrUndefined(undefined)).toBe(true);
    });

    it('should return false for other falsy values', () => {
      expect(checkNullOrUndefined(0)).toBe(false);
      expect(checkNullOrUndefined(false)).toBe(false);
      expect(checkNullOrUndefined("")).toBe(false);
      expect(checkNullOrUndefined(NaN)).toBe(false);
    });

    it('should return false for truthy values', () => {
      expect(checkNullOrUndefined(1)).toBe(false);
      expect(checkNullOrUndefined("hello")).toBe(false);
      expect(checkNullOrUndefined([])).toBe(false);
      expect(checkNullOrUndefined({})).toBe(false);
    });
  });

  describe('falsyVsLooseEquality', () => {
    it('should identify which falsy values are == false', () => {
      const result = falsyVsLooseEquality();
      
      // These are == false
      expect(result.equalToFalse).toEqual(expect.arrayContaining([false, 0, ""]));
      expect(result.equalToFalse.length).toBe(3);
      
      // These are NOT == false (but still falsy!)
      expect(result.notEqualToFalse).toEqual(expect.arrayContaining([null, undefined, NaN]));
      expect(result.notEqualToFalse.length).toBe(3);
    });
  });

  describe('findCoercionBug', () => {
    it('should fix the type coercion bug', () => {
      const result = findCoercionBug();
      
      expect(result.stringOne).toBe(true); // "1" should be admin
      expect(result.numberOne).toBe(false); // 1 should NOT be admin (bug)
      expect(result.booleanTrue).toBe(false); // true should NOT be admin (bug)
    });
  });
});
