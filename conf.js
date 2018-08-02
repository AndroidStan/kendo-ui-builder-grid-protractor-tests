exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['grid_resize.js','grid_reorder.js'],
    capabilities: {
        'browserName': 'firefox'
    }
};