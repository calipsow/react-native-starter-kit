function replaceUmlauts(str) {
  if (typeof str !== 'string') return str;
  const umlautMapping = {
    ä: 'ae',
    ö: 'oe',
    ü: 'ue',
    Ä: 'Ae',
    Ö: 'Oe',
    Ü: 'Ue',
    ß: 'ss', 
  };
  let result = str;
  for (const [umlaut, replacement] of Object.entries(umlautMapping)) {
    const regex = new RegExp(umlaut, 'g'); 
    result = result.replace(regex, replacement);
  }
  return result; 
}
export default replaceUmlauts;
