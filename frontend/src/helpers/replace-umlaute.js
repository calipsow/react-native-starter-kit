function replaceUmlauts(str) {
  if (typeof str !== 'string') return str;
  // Mapping-Objekt für Umlaute und Sonderzeichen
  const umlautMapping = {
    ä: 'ae',
    ö: 'oe',
    ü: 'ue',
    Ä: 'Ae',
    Ö: 'Oe',
    Ü: 'Ue',
    ß: 'ss', // Falls du auch "ß" in "ss" umwandeln möchtest
  };

  // Iteriere über das Mapping-Objekt und ersetze alle vorkommenden Zeichen
  let result = str;

  for (const [umlaut, replacement] of Object.entries(umlautMapping)) {
    // Verwende RegExp, um alle Vorkommen des Zeichens zu ersetzen
    const regex = new RegExp(umlaut, 'g'); // 'g' steht für global (alle Vorkommen)
    result = result.replace(regex, replacement);
  }

  return result; // Gib den modifizierten String zurück
}
export default replaceUmlauts;
