/**
 * Replaces all `undefined` values in an object with `zero`.
 * @param {Object} Obj - The object to be edited.
 * returns  The edited object with `zero` instead of `undefined`.
 */
function replaceUndefinedWithNull(obj) {
  if (obj !== null && typeof obj === 'object') {
    Object.keys(obj).forEach(key => {
      if (obj[key] === undefined) {
        obj[key] = null; // replace undefined with zero
      } else if (typeof obj[key] === 'object') {
        replaceUndefinedWithNull(obj[key]); // Recursive call for objects
      }
    });
  }
  return obj;
}

export default replaceUndefinedWithNull;
