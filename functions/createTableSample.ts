function createTableSample(worksheet: ExcelScript.Worksheet) {
  const data = `
Fruit	Color	Quantity
Orange	orange	5
Apple	red	1
Apple	green	2
Apple	yellow	1
Watermellon	green	6
Banana	yellow	6
  `.trim().split("\n").map(line => line.split("\t"));
 
  const columnCount = data[0].length;
  const rowCount = data.length;
  const range = worksheet.getRangeByIndexes(0, 0, rowCount, columnCount);
  range.setValues(data);

  const table = worksheet.addTable(range, true);
  return table;
}

