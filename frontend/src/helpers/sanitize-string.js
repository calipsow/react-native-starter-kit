/**
* Disinfected Firestore entries to ensure that they are secure and do not contain harmful characters or HTML tags.
 * @param {String} input - The user input to be disinfected.
 * @returns {String} - The sanitised string.
 */
function sanitizeFirestoreInput(input) {
  if (typeof input !== 'string') {
    throw new Error('Input muss ein String sein');
  }

// Removes all HTML tags
  const noHtml = input.replace(/<[^>]*>?/gm, '');

// Replaces special characters with safe analogues
  const escaped = noHtml
    .replace(/&/g, '&amp;') // Replaced '&'
    .replace(/</g, '&lt;') // Replaced '<'
    .replace(/>/g, '&gt;') // Replaced '>'
    .replace(/"/g, '&quot;') // Replaced '"'
    .replace(/'/g, '&#39;'); // Replaced "'"

  return escaped; 
}

export default sanitizeFirestoreInput;
