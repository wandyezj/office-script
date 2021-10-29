function recreateWorksheet(workbook: ExcelScript.Workbook, name: string) {
    const worksheet = workbook.getWorksheet(name);
    if (worksheet) {
        // delete if the worksheet already exists
        worksheet.delete();
    }
    return workbook.addWorksheet(name);
}
