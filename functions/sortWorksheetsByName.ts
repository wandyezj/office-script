function sortWorksheetsByName(workbook: ExcelScript.Workbook): Sheet[] {
    return workbook.getWorksheets().map( sheet => {
        return {
        name: sheet.getName(),
        sheet
        }
    }).sort((a, b) => a.name <= b.name ? -1 : 1).map(i => i.sheet);
}