export default function findPropertyValue(propertyName, obj) {
  if (obj == null || typeof obj !== 'object') {
    return undefined; // Nichts zu durchsuchen, wenn das Objekt nicht gültig ist
  }

  if (propertyName in obj) {
    return obj[propertyName]; // Rückgabe des Werts, wenn die Eigenschaft gefunden wird
  }

  // Rekursive Suche in allen verschachtelten Objekten
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === 'object') {
      const value = findPropertyValue(propertyName, obj[key]);
      if (value !== undefined) {
        return value;
      }
    }
  }

  return undefined; // Rückgabe von undefined, wenn die Eigenschaft nicht gefunden wird
}
