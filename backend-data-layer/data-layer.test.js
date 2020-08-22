const DataLayer = require('./data-layer');

test('Number of Items to be 6', () => {
    var dataLayer = new DataLayer();
    expect(dataLayer.GetCargoConfigBasic().length).toBe(6);
});

test('Insert beer2', () => {
    var dataLayer = new DataLayer();
    expect(dataLayer.SetCargo([{'Id': 'beer2', 'Temperature' : null}])).toBe(1);
});

test('Update beer2 temperature to 4', () => {
    var dataLayer = new DataLayer();
    expect(dataLayer.SetCargo([{'Id': 'beer2', 'Temperature' : 4}])).toBe(1);
});

test('beer2 temperature must be 4', () => {
    var dataLayer = new DataLayer();
    dataLayer.SetCargo([{'Id': 'beer2', 'Temperature' : 4}]);
    expect(dataLayer.GetCargoById('beer2').Temperature).toBe(4);
});

test('beer2 config', () => {
    var dataLayer = new DataLayer();
    expect(dataLayer.GetCargoConfigById('beer2').Maximum).toBe(6);
    expect(dataLayer.GetCargoConfigById('beer2').Minimum).toBe(5);
});

test('history to be 1', () => {
    var dataLayer = new DataLayer();
    dataLayer.SetCargo([{'Id': 'beer2', 'Temperature' : 4}]);
    expect(dataLayer.history.length).toBe(7);
});