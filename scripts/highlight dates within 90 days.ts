function main(workbook: ExcelScript.Workbook) {
  // highlight all days between today and the next number of days out
  // Number of days to look ahead
  const daysOut = 90;

  // Excel by default stores dates as the number of days after January 1, 1900
  const dayMin = currentDaysSince1900();
  const dayMax = dayMin + daysOut;

  // Need to target the column to look at and how far down the column
  const columnToLookAt = "A";
  const rowStart = 1;
  const rowEnd = 4;

  const rangeAddress = `${columnToLookAt}${rowStart}:${columnToLookAt}${rowEnd}`;

  const sheet = workbook.getActiveWorksheet();

  // get range column
  const range = sheet.getRange("A1:A3");
  const values = range.getValues();

  // iterate through the rows of values
  for (let i = 0; i < values.length; i++) {
    const value = values[i][0];
    console.log(value);
    if (typeof value === "number") {
      // only look at numbers
      if (value >= dayMin && value <= dayMax) {
        // highlight
        const rangeAddress = `${columnToLookAt}${rowStart + i}`;
        const range = sheet.getRange(rangeAddress);
        range.getFormat().getFill().setColor("yellow");
      }
    }
  }
}

/**
 * Current Days since Jan 1 1900
 * Equivalent to number of current excel day
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
