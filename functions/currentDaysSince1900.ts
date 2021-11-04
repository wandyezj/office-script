/**
 * Current Days since Jan 1 1900
 * Excel by default stores dates as the number of days after January 1, 1900
 * Should be equivalent to number of the current excel day
 */
function currentDaysSince1900() {
  // method returns the number of milliseconds elapsed since January 1, 1970
  const nowMilliseconds = Date.now();

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const nowDays = Math.floor(nowMilliseconds / millisecondsPerDay);
  const daysBetween1900And1970 = 25567;

  const elapsed = nowDays + daysBetween1900And1970 + 2; // add two to include both jan 1s

  return elapsed;
}
