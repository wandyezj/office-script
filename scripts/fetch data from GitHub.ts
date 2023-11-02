/**
 * Script to show how to fetch public text file data from GitHub and insert it into a worksheet.
 * 
 * How to get the URL on GitHub
 * 1. On Github click the file in the repository
 * 2. click raw
 * 3. Copy the whole url in the address bar
 *   - For private repositories make sure to include the token in the URL: ?token=...
 */
async function main(workbook: ExcelScript.Workbook) {

    // Read a text file on github
    // This file contains a list of shapes
    const request = await fetch("https://raw.githubusercontent.com/wandyezj/data/master/lists/shapes.list.txt")
    const text = await request.text();
    console.log(text);

    // Insert into new worksheet
    const rows = text.split("\n").map(x => [x])
    workbook.addWorksheet().getRange(`A1:A${rows.length}`).setValues(rows);
}