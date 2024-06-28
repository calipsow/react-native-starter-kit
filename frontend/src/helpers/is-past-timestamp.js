export default function isPastInGermany(timestamp) {

  const now = new Date();
  const currentTimezoneOffset = new Date().getTimezoneOffset();
  const germanyOffset = 60; 

  const adjustedOffset = germanyOffset - currentTimezoneOffset / 60;

  const germanyTime = new Date(now.getTime() + adjustedOffset * 60 * 60 * 1000);

  return timestamp < new Date().getTime();
}
