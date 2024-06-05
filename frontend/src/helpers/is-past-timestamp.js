export default function isPastInGermany(timestamp) {
  // Aktuelle Zeit in Deutschland (MEZ/MESZ)
  const now = new Date();
  const currentTimezoneOffset = new Date().getTimezoneOffset();
  const germanyOffset = 60; // Deutschland ist UTC +1 (im Winter) oder +2 (im Sommer)

  // Zeitzonenunterschied korrigieren
  const adjustedOffset = germanyOffset - currentTimezoneOffset / 60;

  // Verschiebung auf die deutsche Zeit
  const germanyTime = new Date(now.getTime() + adjustedOffset * 60 * 60 * 1000);

  // Vergleiche den gegebenen Timestamp
  return timestamp < new Date().getTime();
}
