import { describe, it, expect } from 'vitest';
import { encode, decode } from './rle.js';

describe('Run-Length Encoding', () => {
  describe('encode', () => {
    it('should encode repeated characters', () => {
      expect(encode('aaabbb')).toBe('3a3b');
      expect(encode('aaaa')).toBe('4a');
    });

    it('should handle single characters', () => {
      expect(encode('a')).toBe('1a');
      expect(encode('abc')).toBe('1a1b1c');
    });

    it('should handle mixed patterns', () => {
      expect(encode('aaabbcccc')).toBe('3a2b4c');
      expect(encode('aabbbcccc')).toBe('2a3b4c');
    });

    it('should handle empty string', () => {
      expect(encode('')).toBe('');
    });

    it('should handle long runs', () => {
      expect(encode('aaaaaaaaaa')).toBe('10a');
    });
  });

  describe('decode', () => {
    it('should decode run-length encoded strings', () => {
      expect(decode('3a3b')).toBe('aaabbb');
      expect(decode('4a')).toBe('aaaa');
    });

    it('should handle single character counts', () => {
      expect(decode('1a')).toBe('a');
      expect(decode('1a1b1c')).toBe('abc');
    });

    it('should handle mixed patterns', () => {
      expect(decode('3a2b4c')).toBe('aaabbcccc');
      expect(decode('2a3b4c')).toBe('aabbbcccc');
    });

    it('should handle empty string', () => {
      expect(decode('')).toBe('');
    });

    it('should handle long runs', () => {
      expect(decode('10a')).toBe('aaaaaaaaaa');
    });

    it('should handle double-digit counts', () => {
      expect(decode('12x')).toBe('xxxxxxxxxxxx');
    });
  });

  describe('encode/decode round trip', () => {
    it('should encode and decode back to original', () => {
      const original = 'aaabbccccdddeeeee';
      expect(decode(encode(original))).toBe(original);
    });

    it('should work with various patterns', () => {
      const tests = ['hello', 'aaa', 'aaabbbccc', 'abcdef'];
      tests.forEach(test => {
        expect(decode(encode(test))).toBe(test);
      });
    });
  });
});
