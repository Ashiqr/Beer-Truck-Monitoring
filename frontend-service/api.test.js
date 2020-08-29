const API = require('./api');
const DataLayer = require('../backend-data-layer/data-layer');

var dataLayer = new DataLayer();
const mock = {
    GetCargo : function name(params) {
        return [
                {'Id': 'beer3', 'Temperature' : 4, 'Status': 0, 'LastUpdated': new Date('2020-08-22T17:57:23.806Z')},
                {'Id': 'beer4', 'Temperature' : 5, 'Status': 1, 'LastUpdated': new Date('2020-08-22T17:57:23.806Z')},
                {'Id': 'beer5', 'Temperature' : 6, 'Status': 2, 'LastUpdated': new Date('2020-08-22T17:57:23.806Z')},
                {'Id': 'beer6', 'Temperature' : null, 'Status': 3, 'LastUpdated': new Date('2020-08-22T17:57:23.806Z')},
            ];
    },
    Status : dataLayer.Status
}

test('Test GetDashboardData', () => {
    var api = new API(mock);
    var result = api.GetDashboardData();
    expect(result[0].Status).toBe(dataLayer.Status.Fault);
    expect(result[1].Status).toBe(dataLayer.Status.TooHigh);
    expect(result[2].Status).toBe(dataLayer.Status.TooLow);
    expect(result[3].Status).toBe(dataLayer.Status.Normal);

    expect(result[0].Message).toBe('Sensor Fault');
    expect(result[1].Message).toBe('High');
    expect(result[2].Message).toBe('Low');
    expect(result[3].Message).toBe('Normal');
});
