/**
 * Write all HTML colors to the first column in the active workbook.
 * Each cell will have the color name and that color in the background.
 */
async function main(workbook: ExcelScript.Workbook) {
    // Get the active worksheet
    let selectedSheet = workbook.getActiveWorksheet();

    // Retrieve list of all HTML color names
    const colorListUrl = "https://raw.githubusercontent.com/wandyezj/data/refs/heads/master/lists/html-colors.list.txt";
    const response = await fetch(colorListUrl);

    const colors = await response.text();
    // console.log(colors);

    colors.split("\n").map((color, index) => {
        // Clear the status
        const status = selectedSheet.getCell(index, 1);
        status.setValue("");

        // Write the color name
        const cell = selectedSheet.getCell(index, 0);
        cell.setValue(color);

        try {
            // Format the cell with the color
            cell.getFormat().getFill().setColor(color)
        } catch (e) {
            console.log(`Color broken ${color}`);
            status.setValue("Broken")
        }
    });

    console.log("done");
}