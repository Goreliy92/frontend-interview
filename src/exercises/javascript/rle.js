/**
 * JavaScript Exercise: Run-Length Encoding (RLE)
 * 
 * Task: Implement RLE compression and decompression
 * 
 * Run-Length Encoding is a simple compression algorithm that replaces
 * sequences of identical characters with the character and count.
 * 
 * Example: "aaabbc" -> "3a2b1c" or "a3b2c1"
 */

/**
 * Encode a string using Run-Length Encoding
 * @param {string} str - String to encode
 * @returns {string} - Encoded string
 * 
 * Examples:
 * encode("aaabbc") -> "a3b2c1" 
 * encode("abcd") -> "a1b1c1d1"
 * encode("") -> ""
 * encode("aaa") -> "a3"
 */
export function encode(str) {
  // TODO: Implement RLE encoding
  // Hints:
  // 1. Iterate through the string
  // 2. Count consecutive identical characters
  // 3. Build result as "character + count"
  // 4. Handle empty string
  
  return '';
}

/**
 * Decode a Run-Length Encoded string
 * @param {string} str - Encoded string
 * @returns {string} - Decoded string
 * 
 * Examples:
 * decode("a3b2c1") -> "aaabbc"
 * decode("a1b1c1d1") -> "abcd"
 * decode("") -> ""
 */
export function decode(str) {
  // TODO: Implement RLE decoding
  // Hints:
  // 1. Parse character and count pairs
  // 2. Repeat character count times
  // 3. Handle different formats (a3 or 3a)
  // 4. Use repeat() method or loop
  
  return '';
}

/**
 * Encode with alternative format (count before character)
 * @param {string} str - String to encode
 * @returns {string} - Encoded string in format "3a2b1c"
 */
export function encodeCountFirst(str) {
  // TODO: Implement RLE encoding with count first
  // Format: "3a2b1c" instead of "a3b2c1"
  
  return '';
}

/**
 * Decode from alternative format (count before character)
 * @param {string} str - Encoded string in format "3a2b1c"
 * @returns {string} - Decoded string
 */
export function decodeCountFirst(str) {
  // TODO: Implement RLE decoding for count-first format
  
  return '';
}

/**
 * Smart encode: only use RLE when it reduces length
 * @param {string} str - String to encode
 * @returns {string} - Encoded string (or original if no benefit)
 * 
 * Example:
 * smartEncode("aaabbc") -> "a3b2c1" (saves space)
 * smartEncode("abcd") -> "abcd" (no compression benefit)
 */
export function smartEncode(str) {
  // TODO: Implement smart encoding
  // Only encode if result is shorter than original
  
  return str;
}

/**
 * Check if a string is Run-Length Encoded
 * @param {string} str - String to check
 * @returns {boolean} - True if string appears to be RLE encoded
 */
export function isEncoded(str) {
  // TODO: Implement detection of RLE encoding
  // Check if string matches RLE pattern (letters followed by numbers)
  
  return false;
}
