/**
 *
 * @param {number} deltaDays time delta in days
 * @returns {string} resolved localDateString after subtracting the time delta from the current date
 */
export default function getDateFromToday(deltaDays) {
  const today = new Date(); // Aktuelles Datum und Uhrzeit
  today.setDate(today.getDate() - deltaDays); // Subtrahiere deltaDays vom heutigen Tag
  return today.toLocaleDateString(); // Gibt das Datum im lokalen Format zurück
}
