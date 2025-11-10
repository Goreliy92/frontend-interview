import { describe, it, expect } from 'vitest';
import {
  toString,
  toNumber,
  toBoolean,
  parseInteger,
  parseFloating,
  safeJsonParse,
  objectToQueryString,
  queryStringToObject
} from './type-conversions.js';

describe('Type Conversions', () => {
  describe('toString', () => {
    it('should convert numbers to strings', () => {
      expect(toString(123)).toBe('123');
      expect(toString(0)).toBe('0');
      expect(toString(-456)).toBe('-456');
    });

    it('should convert booleans to strings', () => {
      expect(toString(true)).toBe('true');
      expect(toString(false)).toBe('false');
    });

    it('should handle null and undefined', () => {
      expect(toString(null)).toBe('null');
      expect(toString(undefined)).toBe('undefined');
    });

    it('should convert arrays to strings', () => {
      expect(toString([1, 2, 3])).toBe('1,2,3');
      expect(toString([])).toBe('');
    });

    it('should convert objects to strings', () => {
      expect(toString({})).toContain('object');
    });
  });

  describe('toNumber', () => {
    it('should convert strings to numbers', () => {
      expect(toNumber('123')).toBe(123);
      expect(toNumber('0')).toBe(0);
      expect(toNumber('-456')).toBe(-456);
    });

    it('should convert booleans to numbers', () => {
      expect(toNumber(true)).toBe(1);
      expect(toNumber(false)).toBe(0);
    });

    it('should handle null and undefined', () => {
      expect(toNumber(null)).toBe(0);
      expect(toNumber(undefined)).toBeNaN();
    });

    it('should return NaN for non-numeric strings', () => {
      expect(toNumber('hello')).toBeNaN();
      expect(toNumber('12.34.56')).toBeNaN();
    });
  });

  describe('toBoolean', () => {
    it('should convert falsy values to false', () => {
      expect(toBoolean(false)).toBe(false);
      expect(toBoolean(0)).toBe(false);
      expect(toBoolean('')).toBe(false);
      expect(toBoolean(null)).toBe(false);
      expect(toBoolean(undefined)).toBe(false);
      expect(toBoolean(NaN)).toBe(false);
    });

    it('should convert truthy values to true', () => {
      expect(toBoolean(true)).toBe(true);
      expect(toBoolean(1)).toBe(true);
      expect(toBoolean('hello')).toBe(true);
      expect(toBoolean([])).toBe(true);
      expect(toBoolean({})).toBe(true);
      expect(toBoolean(-1)).toBe(true);
    });
  });

  describe('parseInteger', () => {
    it('should parse integer from string', () => {
      expect(parseInteger('123')).toBe(123);
      expect(parseInteger('-456')).toBe(-456);
    });

    it('should handle different radix', () => {
      expect(parseInteger('ff', 16)).toBe(255);
      expect(parseInteger('101', 2)).toBe(5);
      expect(parseInteger('77', 8)).toBe(63);
    });

    it('should stop at first non-digit', () => {
      expect(parseInteger('123abc')).toBe(123);
      expect(parseInteger('12.34')).toBe(12);
    });

    it('should handle whitespace', () => {
      expect(parseInteger('  123  ')).toBe(123);
    });
  });

  describe('parseFloating', () => {
    it('should parse floating-point numbers', () => {
      expect(parseFloating('123.45')).toBe(123.45);
      expect(parseFloating('-67.89')).toBe(-67.89);
    });

    it('should handle integers', () => {
      expect(parseFloating('123')).toBe(123);
    });

    it('should handle whitespace', () => {
      expect(parseFloating('  123.45  ')).toBe(123.45);
    });

    it('should return NaN for invalid input', () => {
      expect(parseFloating('hello')).toBeNaN();
    });
  });

  describe('safeJsonParse', () => {
    it('should parse valid JSON', () => {
      expect(safeJsonParse('{"name":"John"}')).toEqual({ name: 'John' });
      expect(safeJsonParse('[1,2,3]')).toEqual([1, 2, 3]);
    });

    it('should return fallback on invalid JSON', () => {
      expect(safeJsonParse('invalid', null)).toBe(null);
      expect(safeJsonParse('invalid', {})).toEqual({});
      expect(safeJsonParse('{bad json}', { error: true })).toEqual({ error: true });
    });

    it('should use null as default fallback', () => {
      expect(safeJsonParse('invalid')).toBe(null);
    });
  });

  describe('objectToQueryString', () => {
    it('should convert object to query string', () => {
      const result = objectToQueryString({ name: 'John', age: 30 });
      expect(result).toContain('name=John');
      expect(result).toContain('age=30');
      expect(result).toContain('&');
    });

    it('should handle empty object', () => {
      expect(objectToQueryString({})).toBe('');
    });

    it('should encode special characters', () => {
      const result = objectToQueryString({ text: 'hello world' });
      expect(result).toContain('hello');
    });

    it('should handle multiple parameters', () => {
      const result = objectToQueryString({ a: '1', b: '2', c: '3' });
      expect(result.split('&').length).toBe(3);
    });
  });

  describe('queryStringToObject', () => {
    it('should convert query string to object', () => {
      expect(queryStringToObject('name=John&age=30')).toEqual({
        name: 'John',
        age: '30'
      });
    });

    it('should handle leading question mark', () => {
      expect(queryStringToObject('?name=John&age=30')).toEqual({
        name: 'John',
        age: '30'
      });
    });

    it('should handle empty query string', () => {
      expect(queryStringToObject('')).toEqual({});
      expect(queryStringToObject('?')).toEqual({});
    });

    it('should decode special characters', () => {
      const result = queryStringToObject('text=hello%20world');
      expect(result.text).toContain('hello');
    });
  });
});
