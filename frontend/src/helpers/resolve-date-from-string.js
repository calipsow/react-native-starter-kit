import formatTimeStrungToIso8601 from './format-time-string';

export default function resolveDateObjectFromStr(
  time_string,
  fallbackTime = '2023-12-31T23:00:00.000Z',
) {
  const time = new Date(formatTimeStrungToIso8601(time_string));
  if (!time.getTime()) {
    return new Date(fallbackTime);
  }
  return time;
}
