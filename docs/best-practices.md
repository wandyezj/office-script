# Best Practices

- Use try catch only around specific lines for known exceptions since it can conceal errors and make it hard to debug later. Leave a comment explaining exactly what exception is being caught.

- Read only once and assign to a value if using the value in multiple places.

```typescript
function main(workbook: ExcelScript.Workbook) {
    
    // No, Bad!
    // requires two synced reads
    console.log(workbook.getName());
    console.log(workbook.getName());

    // Yes, Good!
    const workbookName = workbook.getName();
    console.log(workbookName);
    console.log(workbookName);
}
```

## Standard Variable Names

- use `r` for row index and `c` for column index.