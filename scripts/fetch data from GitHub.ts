/**
 * Script to show how to fetch public data from GitHub and insert it into a worksheet.
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