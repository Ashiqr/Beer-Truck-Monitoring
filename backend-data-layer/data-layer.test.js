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

test('history to be 7', () => {
    var dataLayer = new DataLayer();
    dataLayer.SetCargo([{'Id': 'beer2', 'Temperature' : 4}]);
    expect(dataLayer.history.length).toBe(7);
});

test('history sort', () => {
    var dataLayer = new DataLayer();
    var data = [];
    data.push({'Id': 'beer2', 'Temperature' : 4, 'LastUpdated' : new Date('2020-08-22T17:57:23.806Z')});
    data.push({'Id': 'beer2', 'Temperature' : 5, 'LastUpdated' : new Date('2020-08-22T17:59:23.806Z')});
    expect(dataLayer.SortHistory(data)[0].LastUpdated.getMinutes()).toBe(59);
});


test('history filter', () => {
    var dataLayer = new DataLayer();
    var data = [];
    data.push({'Id': 'beer3', 'Temperature' : 4, 'LastUpdated' : new Date('2020-08-22T17:57:23.806Z')});
    data.push({'Id': 'beer2', 'Temperature' : 5, 'LastUpdated' : new Date('2020-08-22T17:59:23.806Z')});
    expect(dataLayer.FilterHistory(data, 'beer2')[0].Id).toBe('beer2');
});

test('history Get', () => {
    var dataLayer = new DataLayer();
    dataLayer.SetCargo([
        {'Id': 'beer3', 'Temperature' : 4, 'LastUpdated' : new Date('2020-08-22T17:57:23.806Z')},
        {'Id': 'beer2', 'Temperature' : 5, 'LastUpdated' : new Date('2020-08-22T17:59:23.806Z')},
        {'Id': 'beer2', 'Temperature' : 6, 'LastUpdated' : new Date('2020-08-22T17:57:23.806Z')}]);
    expect(dataLayer.GetHistory('beer2')[0].Id).toBe('beer2');
    expect(dataLayer.GetHistory('beer2').length).toBe(3);
    expect(dataLayer.GetHistory('All').length).toBe(9);
    expect(dataLayer.GetHistory().length).toBe(9);
});
