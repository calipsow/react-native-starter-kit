export function formatNumberShort(number) {
  if (!number) return number;
  const thresholds = [
    { value: 1_000_000_000, symbol: 'B' }, // Milliarde
    { value: 1_000_000, symbol: 'M' }, // Million
    { value: 1_000, symbol: 'K' }, // Tausend
  ];

  // Wenn die Zahl kleiner als 1.000 ist, einfach als String zurückgeben
  if (number < 1_000) {
    return number.toString();
  }

  // Finde das passende Schwellenwertobjekt, um die Abkürzung zu bestimmen
  const threshold = thresholds.find(th => number >= th.value);

  // Berechne den abgekürzten Wert
  const shortenedValue = (number / threshold.value).toFixed(1); // Ein Nachkommastelle
  const result = `${shortenedValue}${threshold.symbol}`;

  return result;
}
