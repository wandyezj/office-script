async function main(
  workbook: ExcelScript.Workbook,
  officeJsCsv?: string,
  officeScriptsCsv?: string) : Promise<string> {
  // Setup the workbook.
  let worksheet = workbook.getWorksheet("Coverage");
  if (!worksheet) {
    worksheet = workbook.addWorksheet("Coverage");
  }
  worksheet.activate();

  // Clear out the old table.
  let table = worksheet.getTable("CoverageTable");
  if (table) {
    table.delete();
  }

  // Get the data as comma-separated value strings.
  if (!officeJsCsv) {
    officeJsCsv = await fetchCsvText("https://raw.githubusercontent.com/OfficeDev/office-js-docs-reference/master/generate-docs/tools/API%20Coverage%20Report.csv");
  }

  if (!officeScriptsCsv) {
    officeScriptsCsv = await fetchCsvText("https://raw.githubusercontent.com/OfficeDev/office-scripts-docs-reference/master/generate-docs/tools/API%20Coverage%20Report.csv");
  }
  let totalCsv = officeJsCsv + officeScriptsCsv;

  // Trim the trailing new line.
  totalCsv = totalCsv.trim();

  // Convert the CSV string to 2D string arrays.
  let apiData = convertCsvToArray(totalCsv);

  // Add the information to the current worksheet.
  let sheet = workbook.getActiveWorksheet();
  let range = sheet.getRangeByIndexes(0, 0, apiData.length, apiData[0].length);
  range.setValues(apiData);

  // Format information in a table.
  table = sheet.addTable(range, true);
  table.setName("CoverageTable");
  table.setShowTotals(true);
  range.getFormat().autofitColumns();

  // Filter out the fields we're not tracking (Enum fields).
  let typeColumn = table.getColumnByName("Type");
  let typeSet = columnToSet(typeColumn);
  typeColumn.getFilter().applyValuesFilter(typeSet.filter((value) => {
    return value !== "EnumField";
  }));


  // Find the percentage of entries with "TRUE" in the Has Example? column.
  let exampleColumn = table.getColumnByName("Has Example?");
  let totalCount = exampleColumn.getTotalRowRange().getValue() as number;
  exampleColumn.getFilter().applyValuesFilter(["TRUE"]);
  let exampleCount = exampleColumn.getTotalRowRange().getValue() as number;
  let examplePercentage = Math.round(exampleCount / totalCount * 10000) / 100;
  let coverageString = `${exampleCount}/${totalCount} APIs have examples (${examplePercentage}%).`;
  console.log(coverageString);
  return coverageString;
}

/**
 * Get a string (a CSV in this case) from a URL.
 */
async function fetchCsvText(link: string): Promise<string> {
  // Fetch the data from a URL.
  const response = await fetch(link);
  return await response.text();
}

/**
 * Convert the CSV data into a 2D array.
 */
function convertCsvToArray(csv: string): string[][] {
  // Split each line into a row.
  let rows = csv.split("\n");
  let data: string[][] = [];
  rows.forEach((value) => {
    /*
     * For each row, match the comma-separated sections.
     * For more information on how to use regular expressions to parse CSV files,
     * see this Stack Overflow post: https://stackoverflow.com/a/48806378/9227753
     */
    let row = value.match(/(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g)

    // Remove the preceding comma.
    row.forEach((cell, index) => {
      row[index] = cell.indexOf(",") === 0 ? cell.substr(1) : cell;
    });
    data.push(row);
  });

  return data;
}

/**
 * Convert a column into a set so it only contains uniue values.
 */
function columnToSet(column: ExcelScript.TableColumn): string[] {
  let range = column.getRangeBetweenHeaderAndTotal().getValues() as string[][];
  let columnSet: string[] = [];
  range.forEach((value) => {
    if (!columnSet.includes(value[0])) {
      columnSet.push(value[0]);
    }
  });

  return columnSet;
}
