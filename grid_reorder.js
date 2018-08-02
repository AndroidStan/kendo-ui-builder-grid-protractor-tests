describe('Kendo UI Builder Grid Reordering', function() {

    var EC = protractor.ExpectedConditions,
             productInfoHeader,
             idHeader,
             productNameHeader,
             categoryHeader,
             unitPriceHeader;

    beforeAll(function() {

        browser.waitForAngularEnabled(false);

        browser.get('https://www.telerik.com/kendo-angular-ui/components/grid/columns/reordering/');

        var iFrame = element(by.id('example-reordering'));
        //works stable without the next line, but adding it just in case
        //browser.wait(EC.presenceOf(iFrame),1000);

        //works on both Chrome and Mozilla
        browser.switchTo().frame(iFrame.getWebElement());

        //works on Chrome, but doesn't work on Mozilla
        //browser.switchTo().frame('example-reordering');

        var kendoGrid = element(by.tagName('kendo-grid'));
        browser.wait(EC.visibilityOf(kendoGrid),5000);

        productInfoHeader = element(by.css("[aria-colindex='1'][rowspan='1'][colspan='2']"));

        idHeader = element(by.css("[aria-colindex='1'][rowspan='1'][colspan='1']"));
        productNameHeader = element(by.css("[aria-colindex='2'][rowspan='1'][colspan='1']"));

        categoryHeader = element(by.css("[aria-colindex='3'][rowspan='2'][colspan='1']"));
        unitPriceHeader = element(by.css("[aria-colindex='4'][rowspan='2'][colspan='1']"));

        //check the elements with the proper aria-colindex properties have the correct expected names
        expect(productInfoHeader.getText()).toBe('Product Info');
        expect(idHeader.getText()).toBe('ID');
        expect(productNameHeader.getText()).toBe('Product Name');
        expect(categoryHeader.getText()).toBe('Category');
        expect(unitPriceHeader.getText()).toBe('Unit Price');
    });

    afterAll(function() {
        browser.switchTo().defaultContent();
    });

    it('Reorder Product Info and Category columns', function() {
      //reorder the first two columns
      //using mozilla firefox since the drag and drop is not working on chrome
      browser.actions().dragAndDrop(productInfoHeader,categoryHeader).perform();

      //aria-colindex changed from 1 to 2 after the drag and drop
      productInfoHeader = element(by.css("[aria-colindex='2'][rowspan='1'][colspan='2']"));
      //aria-colindex changed from 1 to 2 after the drag and drop
      idHeader = element(by.css("[aria-colindex='2'][rowspan='1'][colspan='1']"));
      //aria-colindex changed from 2 to 3 after the drag and drop
      productNameHeader = element(by.css("[aria-colindex='3'][rowspan='1'][colspan='1']"));

      //aria-colindex changed from 3 (because the Product Info column has two siblings) to 1
      categoryHeader = element(by.css('[aria-colindex="1"][rowspan="2"][colspan="1"]'));

      expect(productInfoHeader.getText()).toBe('Product Info');
      expect(idHeader.getText()).toBe('ID');
      expect(productNameHeader.getText()).toBe('Product Name');
      expect(categoryHeader.getText()).toBe('Category');
    });

    it('Reorder Product Info and Unit Price columns', function() {
        //reorder the first two columns using mozilla firefox since the drag and drop is not working on chrome
        browser.actions().dragAndDrop(productInfoHeader,unitPriceHeader).perform();

        //aria-colindex changed from 2 to 3 after the drag and drop
        productInfoHeader = element(by.css("[aria-colindex='3'][rowspan='1'][colspan='2']")).getText();
        //aria-colindex changed from 2 to 3 after the drag and drop
        idHeader = element(by.css("[aria-colindex='3'][rowspan='1'][colspan='1']"));
        //aria-colindex changed from 3 to 4 after the drag and drop
        productNameHeader = element(by.css("[aria-colindex='4'][rowspan='1'][colspan='1']"));

        //aria-colindex changed from 4 to 2 (because the Product Info column has two siblings)
        unitPriceHeader = element(by.css('[aria-colindex="2"][rowspan="2"][colspan="1"]')).getText();

        expect(productInfoHeader.getText()).toBe('Product Info');
        expect(idHeader.getText()).toBe('ID');
        expect(productNameHeader.getText()).toBe('Product Name');
        expect(unitPriceHeader.getText()).toBe('Unit Price');
    });

    it('Reorder Category and Unit Price columns', function() {
        //reorder the first two columns using mozilla firefox since the drag and drop is not working on chrome
        browser.actions().dragAndDrop(categoryHeader,unitPriceHeader).perform();

        //aria-colindex changed from 1 to 2 after the drag and drop
        categoryHeader = element(by.css("[aria-colindex='2'][rowspan='2'][colspan='1']")).getText();

        //aria-colindex changed from 2 to 1 (because the Product Info column has two siblings)
        unitPriceHeader = element(by.css('[aria-colindex="1"][rowspan="2"][colspan="1"]')).getText();

        expect(categoryHeader.getText()).toBe('Category');
        expect(unitPriceHeader.getText()).toBe('Unit Price');
    });

    it('Reorder ID and Product Name sibling columns', function() {
        //reorder the first two columns using mozilla firefox since the drag and drop is not working on chrome
        browser.actions().dragAndDrop(idHeader, productNameHeader).perform();

        //aria-colindex changed from 3 to 4 after the drag and drop
        idHeader = element(by.css("[aria-colindex='4'][rowspan='1'][colspan='1']")).getText();

        //aria-colindex changed from 4 to 3 (because the Product Info column has two siblings)
        productNameHeader = element(by.css('[aria-colindex="3"][rowspan="1"][colspan="1"]')).getText();

        expect(idHeader.getText()).toBe('ID');
        expect(productNameHeader.getText()).toBe('Product Name');
    });

    it('Try reordering the child ID column with its parent Product Info', function() {
        //reorder the first two columns using mozilla firefox since the drag and drop is not working on chrome
        browser.actions().dragAndDrop(idHeader, productInfoHeader).perform();

        //aria-colindex stays the same since we can't make this reordering
        idHeader = element(by.css("[aria-colindex='4'][rowspan='1'][colspan='1']")).getText();

        //aria-colindex not changed since we can't make this reordering
        productInfoHeader = element(by.css('[aria-colindex="3"][rowspan="1"][colspan="2"]')).getText();

        expect(idHeader.getText()).toBe('ID');
        expect(productInfoHeader.getText()).toBe('Product Info');
    });

    it('Try reordering the child Product Name column with its left autonomous Unit Price one', function() {
        //reorder the first two columns using mozilla firefox since the drag and drop is not working on chrome
        browser.actions().dragAndDrop(productNameHeader, categoryHeader).perform();

        //aria-colindex stays the same since we can't make this reordering
        productNameHeader = element(by.css("[aria-colindex='3'][rowspan='1'][colspan='1']")).getText();

        //aria-colindex not changed since we can't make this reordering
        categoryHeader = element(by.css('[aria-colindex="2"][rowspan="2"][colspan="1"]')).getText();

        expect(productNameHeader.getText()).toBe('Product Name');
        expect(categoryHeader.getText()).toBe('Category');
    });

});