import FileSaver from 'file-saver';
import Excel from 'exceljs';

// Export excel file with dynamic dropdowns
// All hope abandon, ye who enter here.
export const downloadExcel = (data) => {
    let workbook = new Excel.Workbook();
    let fileName = `${data.fileName}`;
    workbook.creator = 'Initial Creator';
    workbook.lastModifiedBy = 'Someone who entered data and is exporting it';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();

    let mainSheet = workbook.addWorksheet('MainData');
    let dropdownSheet = workbook.addWorksheet('DropdownOptions');
    let sheetColumns = [];

    /*  add columns first to be able to reference them by key during formatting step
        My columns are an array of objects defining the individual columns

        ['Column Name': {                
        columnHeader: 'Column Header',
        data: 'correspondingDataField',
        pattern: /someRegex/,
        error: 'Does not match validation pattern.',
        tooltip: 'Please enter xyz.',
        },...]
    */

    data.columns.forEach((columnDef) => {     
        // SKIP hidden columns (if any)
        if ('hidden' in columnDef) {
            return;
        }  
        sheetColumns.push({
            header: columnDef.columnHeader,
            key: columnDef.dataFieldName,
            width: 40,
        });
    });

    // Add columns to both sheets
    mainSheet.columns = sheetColumns;
    dropdownSheet.columns = sheetColumns;

    //  format header and tooltips
    let headerRow = mainSheet.getRow(1);
    headerRow.alignment = {
        vertical: 'middle',
        horizontal: 'center',
        wrapText: true,
    };
    headerRow.height = 40;
    headerRow.font = { bold: true };


    // I added a tooltop row to give users an idea of what data is excpected 
    let tooltipRow = mainSheet.getRow(2);    
    tooltipRow.alignment = {
        vertical: 'middle',
        horizontal: 'center',
        wrapText: true,
    };
    tooltipRow.height = 150;

    // FILL
    data.columns.forEach((columnDef) => {
        // SKIP hidden columns (if any)
        if ('hidden' in columnDef) {
            return;
        }

        // ADD EXISTING VALUES
        // need to do this in the column loop because adding dataValidation to a cell by its coords 
        // creates new rows
        for (let i = 0; i < data.rows.length + 10; i++) {
            // +3, skip 0, header and tooltip indeces
            let cell = mainSheet.getRow(i + 3).getCell(`${columnDef.data}`);
            // fill with value or empty string depending on data 
            cell.value = data.rows[i] ? data.rows[i][columnDef.data] : '';
        }

        let headerCell = headerRow.getCell(`${columnDef.data}`);
        let tooltipCell = tooltipRow.getCell(`${columnDef.data}`);
        
        // add tooltip
        tooltipCell.value = columnDef.tooltip || '';

        // highlight optionals
        // argb: https://coderwall.com/p/dedqca/argb-colors-in-android
        if ('optional' in columnDef && columnDef.optional) {
            headerCell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '66A6CE39' },
            };
        } else {
            headerCell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '4D8FC7E8' },
            };
        }

        // HANDLE DROPDOWNS
        //  dropdown options are added to second sheet and referenced as ranges in the dataValidation property
        //  Syntax to reference a range in another sheet: Sheet!$Col$FirstRow:$Col$LastRow
        //  dataCell.dataValidation = { type: 'list', formulae: ['DropdownOptions!$F$1:$F$20'] };
        let hasDropdown = 'source' in columnDef || 'barcodeHash' in columnDef;
        if (hasDropdown) {
            let options;
            if ('especiallyLargeDropdown' in columnDef) {
                tooltipCell.value =
                    'NOTE: Dropdown takes a while to load in Excel. You can go to the second sheet and copy your value from there. ' +
                    tooltipCell.value;
                options = Object.keys(columnDef.barcodeHash);
            } else {
                options = columnDef.source;
            }

            options.forEach((dropdownOption, index) => {
                // start adding dropdown options to second sheet, after header row which starts at 1
                let row = dropdownSheet.getRow(index + 2);
                let cell = row.getCell(`${columnDef.data}`);
                cell.value = dropdownOption;
                // done with adding dropdown options
                if (index === options.length - 1) {
                    // split letters from numbers to compute range
                    let formulaAddress = cell._address.match(/[a-zA-Z]+|[0-9]+/g);
                    let col = formulaAddress[0];
                    let lastRow = formulaAddress[1];
                    // create address for first dropdown option
                    let firstCellAddress = `$${col}$2`;
                    // create address for last dropdown option
                    let lastCellAddress = `$${col}$${lastRow}`;
                    // assemble range string
                    let rangeString = `DropdownOptions!${firstCellAddress}:${lastCellAddress}`;
                    // apply validation to whole column (#samples + 10)
                    for (let i = 0; i < data.rows.length + 10; i++) {
                        // +3, skip 0, header and tooltip
                        let cell = mainSheet.getRow(i + 3).getCell(`${columnDef.data}`);
                        cell.dataValidation = {
                            type: 'list',
                            formulae: [rangeString],
                            operator: 'equal',
                            showErrorMessage: true,
                            error: 'Dropwdown options only, please.',
                        };
                    }
                }
            });
        }
    });
    workbook.xlsx.writeBuffer().then(function(data) {
        var blob = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        FileSaver.saveAs(blob, `${fileName}.xlsx`);
    });
};
