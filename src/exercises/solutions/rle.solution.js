/**
 * Solution: Run-Length Encoding (RLE)
 */

export function encode(str) {
  if (!str) return '';
  
  let result = '';
  let count = 1;
  
  for (let i = 0; i < str.length; i++) {
    if (i + 1 < str.length && str[i] === str[i + 1]) {
      count++;
    } else {
      result += str[i] + count;
      count = 1;
    }
  }
  
  return result;
}

export function decode(str) {
  if (!str) return '';
  
  let result = '';
  let i = 0;
  
  while (i < str.length) {
    const char = str[i];
    i++;
    
    let numStr = '';
    while (i < str.length && /\d/.test(str[i])) {
      numStr += str[i];
      i++;
    }
    
    const count = parseInt(numStr) || 1;
    result += char.repeat(count);
  }
  
  return result;
}

export function encodeCountFirst(str) {
  if (!str) return '';
  
  let result = '';
  let count = 1;
  
  for (let i = 0; i < str.length; i++) {
    if (i + 1 < str.length && str[i] === str[i + 1]) {
      count++;
    } else {
      result += count + str[i];
      count = 1;
    }
  }
  
  return result;
}

export function decodeCountFirst(str) {
  if (!str) return '';
  
  let result = '';
  let i = 0;
  
  while (i < str.length) {
    let numStr = '';
    while (i < str.length && /\d/.test(str[i])) {
      numStr += str[i];
      i++;
    }
    
    const count = parseInt(numStr) || 1;
    const char = str[i];
    i++;
    
    result += char.repeat(count);
  }
  
  return result;
}

export function smartEncode(str) {
  const encoded = encode(str);
  return encoded.length < str.length ? encoded : str;
}

export function isEncoded(str) {
  // Check if string matches RLE pattern: letter followed by digit(s)
  const pattern = /^([a-zA-Z]\d+)+$/;
  return pattern.test(str);
}
