/**
 * Get the value of a nested property in an object based on a given object path.
 * If the path doesn't exist, return null.
 * @param {Object} obj - The object to search within.
 * @param {String} objectPath - The path to the property, as a string (e.g., 'location.province').
 * @returns {any} - The value of the nested property or null if not found.
 */
function getNestedProperty(obj, objectPath) {
  if (!obj || typeof objectPath !== 'string') {
    return null;
  }

  // Split the object path into an array of keys
  const keys = objectPath.split('.');

  // Start with the given object
  let current = obj;

  // Traverse through the object path
  for (const key of keys) {
    // eslint-disable-next-line no-prototype-builtins
    if (current.hasOwnProperty(key)) {
      current = current[key]; // Go deeper
    } else {
      return null; // Path doesn't exist
    }
  }

  return current; // Return the value at the end of the path
}

export default getNestedProperty;
