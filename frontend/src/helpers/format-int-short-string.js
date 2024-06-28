export function formatNumberShort(number) {
  if (!number) return number;
  const thresholds = [
    { value: 1_000_000_000, symbol: 'B' }, // Billion 
    { value: 1_000_000, symbol: 'M' }, // Million 
    { value: 1_000, symbol: 'K' }, // Thausend 
  ];

  if (number < 1_000) {
    return number.toString();
  }

  const threshold = thresholds.find(th => number >= th.value);

  const shortenedValue = (number / threshold.value).toFixed(1); // Ein Nachkommastelle
  const result = `${shortenedValue}${threshold.symbol}`;

  return result;
}
