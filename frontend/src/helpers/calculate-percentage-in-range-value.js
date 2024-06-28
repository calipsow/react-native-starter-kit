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

  const percentage = (given_value - min_value) / (max_value - min_value);

  // Applying the calculated percentage to the new range, defined by calculate_on_range
  const result =
    calculate_on_range.start +
    percentage * (calculate_on_range.end - calculate_on_range.start);

  return result;
}

/* Example of how the function can be used:
const max_value = 10;
const min_value = 0;
const given_value = 5;
const range = { zero: -120, hundred: 120 };

const output = calculatePercentageInRange(max_value, given_value, min_value, range);
console.log(output);  // This will output the converted value in the new area
*/

export default calculatePercentageInRange;
