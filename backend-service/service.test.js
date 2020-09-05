const Service = require('./service');
var DataLayer = require('../backend-data-layer/data-layer');

test('Test EvaluateTemperature normal', () => {
    expect(Service.EvaluateTemperature(new DataLayer(), {'Id': 'beer1', 'Name' : 'Pilsner', 'Minimum': 4, 'Maximum': 6}, 5)).toBe(0);
});

test('Test EvaluateTemperature low', () => {
    expect(Service.EvaluateTemperature(new DataLayer(), {'Id': 'beer1', 'Name' : 'Pilsner', 'Minimum': 4, 'Maximum': 6}, 0)).toBe(1);
});

test('Test EvaluateTemperature high', () => {
    expect(Service.EvaluateTemperature(new DataLayer(), {'Id': 'beer1', 'Name' : 'Pilsner', 'Minimum': 4, 'Maximum': 6}, 15)).toBe(2);
});
