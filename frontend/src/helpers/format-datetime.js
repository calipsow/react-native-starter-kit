function formatDateTimeString(datetime, eventType = 'Event') {
  if (typeof datetime !== 'string' || !datetime || datetime === '2024')
    return '2024';
  const formattedDatetime = `${datetime}`
    .replace('-', eventType === 'Event' ? 'ab' : ',')
    .replace(',', eventType === 'Event' ? ' ab' : ' um')
    .split(':')
    .filter((_, i) => i < 2)
    .join(':');
  var finalString = `${formattedDatetime}${
    !formattedDatetime.includes('Uhr') ? ' Uhr' : ''
  }`;
  if (finalString[0] === ' ') finalString.slice(0, 1);
  return finalString;
}
export default formatDateTimeString;
