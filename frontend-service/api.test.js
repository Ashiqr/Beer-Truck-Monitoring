const API = require('./api');

const mock = {
    GetCargo : function name(params) {
        return [
                {'Id': 'beer3', 'Temperature' : 4, 'Status': 0, 'LastUpdated': new Date('2020-08-22T17:57:23.806Z')},
                {'Id': 'beer4', 'Temperature' : 5, 'Status': 1, 'LastUpdated': new Date('2020-08-22T17:57:23.806Z')},
                {'Id': 'beer5', 'Temperature' : 6, 'Status': 2, 'LastUpdated': new Date('2020-08-22T17:57:23.806Z')},
                {'Id': 'beer6', 'Temperature' : null, 'Status': 3, 'LastUpdated': new Date('2020-08-22T17:57:23.806Z')},
            ];
    }
}

test('Test GetDashboardData', () => {
    var api = new API(mock);
    var result = api.GetDashboardData();
    expect(result[0].Status).toBe(3);
    expect(result[1].Status).toBe(2);
    expect(result[2].Status).toBe(1);
    expect(result[3].Status).toBe(0);

    expect(result[0].Message).toBe('Sensor Fault');
    expect(result[1].Message).toBe('High');
    expect(result[2].Message).toBe('Low');
    expect(result[3].Message).toBe('Normal');
});
