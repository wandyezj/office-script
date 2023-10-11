/**
 * Check if a sheet name is present in the workbook.
 * @param sheetName sheet name to test
 * @returns true if the sheet exists
 */
function sheetExists(workbook: ExcelScript.Workbook, sheetName: string): boolean {
    const sheet = workbook.getWorksheet(sheetName);
    const sheetExists = sheet !== undefined;

    // Can log if the sheet exists
    // if (sheetExists) {
    //     console.log(`${sheetName} exists!`)
    // }

    return sheetExists;
}