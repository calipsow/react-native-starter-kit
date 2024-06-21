/**
 * Ersetzt alle `undefined` Werte in einem Objekt mit `null`.
 * @param {Object} obj - Das Objekt, das bearbeitet werden soll.
 * returns  Das bearbeitete Objekt mit `null` anstelle von `undefined`.
 */
function replaceUndefinedWithNull(obj) {
  if (obj !== null && typeof obj === 'object') {
    Object.keys(obj).forEach(key => {
      if (obj[key] === undefined) {
        obj[key] = null; // Ersetze undefined mit null
      } else if (typeof obj[key] === 'object') {
        replaceUndefinedWithNull(obj[key]); // Rekursiver Aufruf für Objekte
      }
    });
  }
  return obj;
}

export default replaceUndefinedWithNull;
