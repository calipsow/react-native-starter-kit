export const floorFloat = num => Math.floor(num * 10) / 10;
/**
 * The function calcs the score of the last 30 days.
 * The highest possible value for each score is 10 and represents the max achievable score
 * @param {number} clicks_overall takes a integer representing the event clicks (views) over all for the user
 * @param {number} event_commitments_over_all takes int counting all commitments for all events posted by the user
 * @param {array} posted_events takes all events summarized as array containing for each event an object with the following structure:
 * {created_at: (mill sec timestamp), commitments: int (sum of all event commitments to this event)}
 * @returns {object} returns an object including the calculated scores of the last 30 days
 * {
 *   ACTIVITY_SCORE: activityScore,
 *   COMMITMENT_SCORE: commitmentScore,
 *   COMMITMENTS_PER_CLICK_SCORE: commitsPerClickScore
 * }
 */
function calculate30DayUserScores(
  clicks_overall,
  event_commitments_over_all,
  posted_events,
) {
  const THIRTY_DAYS_IN_MILLISECONDS = 30 * 24 * 60 * 60 * 1000;
  const currentDate = Date.now();
  let activityScore = 0;
  let recentEvents = [];
  // console.log(posted_events);
  if (Array.isArray(posted_events)) {
    // Filter events created within the last 30 days
    recentEvents = posted_events.filter(
      event => currentDate - event.created_at <= THIRTY_DAYS_IN_MILLISECONDS,
    );

    // Calculate Activity Score
    activityScore = Math.min(
      10,
      recentEvents.length
        ? recentEvents.length * 1.3
        : posted_events.length
        ? 1.5
        : 0,
    );
  }
  // Calculate Commitment Score
  let commitmentScore = 0;
  if (recentEvents.length > 0) {
    const eventsWithAtLeastTwoCommitments = recentEvents.filter(
      event => event.commitments >= 1,
    ).length;

    commitmentScore =
      (eventsWithAtLeastTwoCommitments / recentEvents.length) * 10;
  }

  // Calculate Commits Per Click Score
  let commitsPerClickScore = 0;
  if (clicks_overall > 0) {
    commitsPerClickScore =
      (event_commitments_over_all / (clicks_overall * 0.35)) * 10;
    commitsPerClickScore = Math.min(10, commitsPerClickScore); // Ensure the score does not exceed 10
  }

  return {
    ACTIVITY_SCORE: floorFloat(activityScore),
    COMMITMENT_SCORE: floorFloat(commitmentScore),
    COMMITMENTS_PER_CLICK_SCORE: floorFloat(commitsPerClickScore),
  };
}

/* Beispiel für die Verwendung dieser Funktion
const posted_events = [
  { created_at: Date.now() - 5 * 24 * 60 * 60 * 1000, commitments: 3 }, // vor 5 Tagen, 3 Zusagen
  { created_at: Date.now() - 15 * 24 * 60 * 60 * 1000, commitments: 1 }, // vor 15 Tagen, 1 Zusage
  { created_at: Date.now() - 35 * 24 * 60 * 60 * 1000, commitments: 4 }, // vor 35 Tagen, 4 Zusagen
];

console.log(calculateScores(100, 95, posted_events));
*/
export default calculate30DayUserScores;
