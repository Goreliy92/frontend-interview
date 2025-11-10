/**
 * Solution: Type Conversions
 */

export function toString(value) {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) return value.join(',');
  if (typeof value === 'object') {
    if (typeof value.toString === 'function' && value.toString !== Object.prototype.toString) {
      return value.toString();
    }
    return '[object Object]';
  }
  return String(value);
}

export function toNumber(value) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed === '') return 0;
    return Number(trimmed);
  }
  if (typeof value === 'boolean') return value ? 1 : 0;
  if (value === null) return 0;
  if (value === undefined) return NaN;
  if (typeof value === 'object') return NaN;
  return Number(value);
}

export function toBoolean(value) {
  // Falsy values: false, 0, '', null, undefined, NaN
  if (!value) return false;
  if (value === 0 || value === '') return false;
  return true;
}

export function parseInteger(str, radix = 10) {
  return parseInt(str, radix);
}

export function parseFloating(str) {
  return parseFloat(str);
}

export function safeJsonParse(str, fallback = null) {
  try {
    return JSON.parse(str);
  } catch (error) {
    return fallback;
  }
}

export function objectToQueryString(obj) {
  return Object.entries(obj)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

export function queryStringToObject(queryString) {
  const clean = queryString.startsWith('?') ? queryString.slice(1) : queryString;
  
  if (!clean) return {};
  
  return clean.split('&').reduce((acc, pair) => {
    const [key, value] = pair.split('=');
    acc[decodeURIComponent(key)] = decodeURIComponent(value || '');
    return acc;
  }, {});
}
