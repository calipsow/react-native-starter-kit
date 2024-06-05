/**
 * Desinfiziert Firestore-Eingaben, um sicherzustellen, dass sie sicher sind und keine schädlichen Zeichen oder HTML-Tags enthalten.
 * @param {String} input - Die Nutzereingabe, die desinfiziert werden soll.
 * @returns {String} - Der desinfizierte String.
 */
function sanitizeFirestoreInput(input) {
  if (typeof input !== 'string') {
    throw new Error('Input muss ein String sein');
  }

  // Entfernt alle HTML-Tags
  const noHtml = input.replace(/<[^>]*>?/gm, '');

  // Ersetzt Sonderzeichen durch sichere Entsprechungen
  const escaped = noHtml
    .replace(/&/g, '&amp;') // Ersetzt '&'
    .replace(/</g, '&lt;') // Ersetzt '<'
    .replace(/>/g, '&gt;') // Ersetzt '>'
    .replace(/"/g, '&quot;') // Ersetzt '"'
    .replace(/'/g, '&#39;'); // Ersetzt "'"

  return escaped; // Gibt den desinfizierten String zurück
}

export default sanitizeFirestoreInput;
