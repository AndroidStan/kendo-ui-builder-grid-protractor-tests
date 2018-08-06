/*  colspan
            Allows a single table cell to span the width of more than one cell or column.
    rowspan
            Allows a single table cell to span the height of more than one cell or row.*/
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['grid_resize.js','grid_reorder.js'],
    capabilities: {
        'browserName': 'firefox'
    },
    params: {
        reorderingUrl: 'https://www.telerik.com/kendo-angular-ui/components/grid/columns/reordering/',
        exampleIframeID: 'example-reordering',
        kendoGridTagName: 'kendo-grid',
        kendoGridVisibilityTimeout: 5000,
        productInfoHeaderTitle: 'Product Info',
        idSubHeaderTitle: 'ID',
        productNameSubHeaderTitle: 'Product Name',
        categoryHeaderTitle: 'Category',
        unitPriceHeaderTitle: 'Unit Price'
    }

};