/**
 *
 * @param {number} max_value
 * @param {number} given_value
 * @param {number} min_value
 * @param {object<{start: number, end: number}>} calculate_on_range
 * @returns
 */
function calculatePercentageInRange(
  max_value,
  given_value,
  min_value,
  calculate_on_range,
) {
  // Berechnung des Prozentsatzes von given_value im Bereich von min_value bis max_value
  const percentage = (given_value - min_value) / (max_value - min_value);

  // Anwenden des berechneten Prozentsatzes auf den neuen Bereich, definiert durch calculate_on_range
  const result =
    calculate_on_range.start +
    percentage * (calculate_on_range.end - calculate_on_range.start);

  // Rückgabe des berechneten Werts
  // console.log(result);
  return result;
}

/* Beispiel, wie die Funktion verwendet werden kann:
const max_value = 10;
const min_value = 0;
const given_value = 5;
const range = { zero: -120, hundred: 120 };

const output = calculatePercentageInRange(max_value, given_value, min_value, range);
console.log(output);  // Dies wird den umgerechneten Wert im neuen Bereich ausgeben
*/

export default calculatePercentageInRange;
