const dataLayer = require('./data-layer');

test('Number of Items to be 6', () => {
    expect(dataLayer.GetCargoConfigBasic().length).toBe(6);
});


test('Insert beer2', () => {
    expect(dataLayer.SetCargo([{'Id': 'beer2', 'Temperature' : null}])).toBe(1);
});


test('Update beer2 temperature to 4', () => {
    expect(dataLayer.SetCargo([{'Id': 'beer2', 'Temperature' : 4}])).toBe(1);
});

test('Number of Items to be 1', () => {
    expect(dataLayer.GetCargo().length).toBe(1);
});

test('beer2 temperature to 4', () => {
    expect(dataLayer.GetCargo()[0].Temperature).toBe(4);
});