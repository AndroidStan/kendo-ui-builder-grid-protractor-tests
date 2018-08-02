describe('Kendo UI Builder Grid Resizing', function() {

    var EC = protractor.ExpectedConditions,
             productInfoHeader,
             productInfoSpanResizer,
             idHeader,
             productNameHeader,
             categoryHeader,
             unitPriceHeader;

    beforeAll(function() {

        browser.waitForAngularEnabled(false);

        browser.get('https://www.telerik.com/kendo-angular-ui/components/grid/columns/resizing/');

        var iFrame = element(by.id('example-resizing'));

        browser.switchTo().frame(iFrame.getWebElement());

        var kendoGrid = element(by.tagName('kendo-grid'));
        browser.wait(EC.visibilityOf(kendoGrid),5000);

        productInfoHeader = element(by.css("[aria-colindex='1'][rowspan='1'][colspan='2']"));
        productInfoSpanResizer = element(by.css("[aria-colindex='1'][rowspan='1'][colspan='2'] > .k-column-resizer"));
        expect(productInfoHeader.getText()).toBe('Product Info');

        productInfoHeader.getLocation().then(function (productInfoHeaderLocation) {
            productInfoSpanResizer.getLocation().then(function (productInfoSpanResizerLocation) {
                var new_x = productInfoSpanResizerLocation.x + productInfoSpanResizerLocation.width/2;
                var new_y = productInfoHeaderLocation.y + productInfoHeaderLocation.height/2;

                browser.actions().mouseMove({x:new_x, y:new_y}).perform();
            });
        });

    });

    afterAll(function() {
        browser.switchTo().defaultContent();
    });

    it('Resize the Product Info column', function() {

        productInfoHeader.getLocation().then(function (location) {
            expect(location.width).toBe(410);
        });

        browser.actions().dragAndDrop({x:0, y:0},{x:30, y:0}).perform();

        productInfoHeader.getLocation().then(function (location) {
            //it's either a protractor dragAndDrop or the grid issue
            //which is causing the back and forth moves to always happen 1 pixel more than expected
            expect(location.width).toBe(441);
        });

        //if we don't use this sleep, the second dragAndDrop acts like a double click over the product info span resizer
        //which is not something we want as a side effect of the quick mouse down, mouse up, mouse down, mouse up action
        browser.sleep(1000);

        browser.actions().dragAndDrop({x:0, y:0},{x:-20, y:0}).perform();

        //alternative to the drag and drop is commented below, which is actually the same as the above line
        /*browser.actions()
            .mouseDown({x:0, y:0})
            .mouseMove({x:-20, y:0})
            .mouseUp()
            .perform();*/

        productInfoHeader.getLocation().then(function (location) {
            //it's either a protractor dragAndDrop or the grid issue
            //which is causing the back and forth moves to always happen 1 pixel more than expected
            expect(location.width).toBe(420);
        });

        //we can simulate double click like that, with no delay from the previous drag and drop
        //browser.actions().dragAndDrop({x:0, y:0},{x:0, y:0}).perform();
        //or use the built-in double click:
        browser.actions().doubleClick({x:0, y:0}).perform();

        productInfoHeader.getLocation().then(function (location) {
            //it's either a protractor dragAndDrop or the grid issue
            //which is causing the back and forth moves to always happen 1 pixel more than expected
            expect(location.width).toBe(274);
        });

        //just in order to see the movement
        browser.sleep(5000);
    });

});