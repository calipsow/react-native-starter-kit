export default function formatTimeStrungToIso8601(dateString = '') {
  if (
    typeof dateString !== 'string' ||
    !(dateString.length >= 18 && dateString.length <= 20)
  ) {
    console.warn('can not convert invalid time string', dateString);
    return '2023-12-31T23:00:00.000Z';
  }
  var parts = dateString.split(', ');
  var dateParts = parts[0].split('.');
  var timeParts = parts[1].split(':');

  var formattedDate = `${dateParts[2]}-${dateParts[1].padStart(
    2,
    '0',
  )}-${dateParts[0].padStart(2, '0')}T${timeParts[0]}:${timeParts[1]}:${
    timeParts[2]
  }`;
  return formattedDate;
}
