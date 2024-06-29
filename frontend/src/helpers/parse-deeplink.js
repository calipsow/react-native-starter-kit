/**
 *
 * @param {*} deeplink the deeplink url
 * @returns an array [route, params]
 */
export default function parseRouteAndParams(url = '') {
  // Adjust this so it matches your domain 
  try {
    let route = null,
      params = null;
    if (url.startsWith('shipnative://')) {

      route = url.split('shipnative://')[1].split('/')[0] || null;
      params = url.split('shipnative://')[1].split('/')[1] || null;
    } else if (url.startsWith('https://')) {

      route =
        url.split('https://shipnative.app/')[1].split('/')[0] ||
        null;
      params =
        url.split('https://shipnative.app/')[1].split('/')[1] ||
        null;
    }
    return [route, params];
  } catch (error) {
    console.log('failed to resolve deeplink route or params from url:', url);
    return [null, null];
  }
}
