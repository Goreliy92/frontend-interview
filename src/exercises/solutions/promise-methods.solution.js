/**
 * Solution: Promise Methods
 */

export function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([]);
      return;
    }
    
    const results = [];
    let completedCount = 0;
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          completedCount++;
          
          if (completedCount === promises.length) {
            resolve(results);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  });
}

export function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      return;
    }
    
    promises.forEach(promise => {
      Promise.resolve(promise)
        .then(resolve)
        .catch(reject);
    });
  });
}

export function promiseAllSettled(promises) {
  return new Promise((resolve) => {
    if (promises.length === 0) {
      resolve([]);
      return;
    }
    
    const results = [];
    let completedCount = 0;
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = { status: 'fulfilled', value };
          completedCount++;
          
          if (completedCount === promises.length) {
            resolve(results);
          }
        })
        .catch(reason => {
          results[index] = { status: 'rejected', reason };
          completedCount++;
          
          if (completedCount === promises.length) {
            resolve(results);
          }
        });
    });
  });
}

export function delay(ms, value) {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

export function delayReject(ms, reason) {
  return new Promise((_, reject) => setTimeout(() => reject(reason), ms));
}
