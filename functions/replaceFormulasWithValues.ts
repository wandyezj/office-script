/**
 * Replace any formulas with the current value.
 * @param range The range to replace the formulas on.
 */
function replaceFormulasWithValues(range: ExcelScript.Range) {
    // Read the existing values and then write them over the range.
    // note: for large ranges this will error out.
    const values = range.getValues();
    range.setValues(values);
}
