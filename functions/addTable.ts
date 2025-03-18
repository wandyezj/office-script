/**
 * Add a tsv formatted table to a worksheet.
 * note: Does not overwrite existing tables.
 * @param worksheet - Worksheet to add table to.
 * @param tsv - Tab separated value string with header.
 * @param startColum - column number in worksheet to start the table on
 */
function addTable(worksheet: ExcelScript.Worksheet, tsv: string, startColumn = 0) {
    const data = tsv.trim().split("\n").map(line => line.split("\t"));

    const columnCount = data[0].length;
    const rowCount = data.length;
    const range = worksheet.getRangeByIndexes(0, startColumn, rowCount, columnCount);
    range.setValues(data);

    const table = worksheet.addTable(range, true);
    return table;
}
