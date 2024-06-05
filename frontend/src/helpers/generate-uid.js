export default function generateUniqueID() {
  const timestamp = Date.now().toString(36); // Aktuelle Zeit als Base36 String
  const randomString = Math.random().toString(36).substr(2, 5); // Zufällige Zahl als Base36 String
  return timestamp + randomString; // Kombiniere Zeitstempel und Zufallszahl
}
