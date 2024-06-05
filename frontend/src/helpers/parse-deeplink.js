/**
 *
 * @param {*} deeplink the deeplink url
 * @returns an array [route, params]
 */
export default function parseRouteAndParams(url = '') {
  // Prüfe, welches Schema verwendet wird
  try {
    let route = null,
      params = null;
    if (url.startsWith('zsw://')) {
      // Extrahiere alles nach "zsw://"
      route = url.split('zsw://')[1].split('/')[0] || null;
      params = url.split('zsw://')[1].split('/')[1] || null;
    } else if (url.startsWith('https://')) {
      // Extrahiere alles nach "https://zusammen-stehen-wir.de/app/"
      route =
        url.split('https://zusammen-stehen-wir.de/app/')[1].split('/')[0] ||
        null;
      params =
        url.split('https://zusammen-stehen-wir.de/app/')[1].split('/')[1] ||
        null;
    }
    return [route, params];
  } catch (error) {
    console.log('failed to resolve deeplink route or params from url:', url);
    return [null, null];
  }
}
