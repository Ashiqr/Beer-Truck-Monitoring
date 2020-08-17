var https = require('https');
var dataLayer = require('../backend-data-layer/data-layer');

function Driver(){
    GetTemperature(0);
}

function GetTemperature (Index) {
    var beer = dataLayer.GetCargoById(Index);
    if (beer){
        var options = {
            host: 'beer-truck',
            path: 'https://temperature-sensor-service.herokuapp.com/sensor/' + beer.Id,
            method: 'GET'
        };
        var req = https.request(options, function(res) {
            res.setEncoding('utf-8');
        
            var responseString = '';
        
            res.on('error', function(responseString) {
                console.log(responseString);
                UpdateStatus(Index, beer.Id, null, dataLayer.Status.Fault);
            });

            res.on('end', function(responseString) {
                var responseReading = JSON.parse(responseString);
                EvaluateTemperature(Index, beer.Id, responseReading.temperature);
            });
        });
    }
}

function EvaluateTemperature(Index, Id, Temperature){
    var beer =  dataLayer.GetCargoById(Id);
    if (!beer){
        throw 'Invalid Id: ' + Id;
    }

    var status = dataLayer.Status.Normal;
    if (Temperature < beer.Minimum){
        status = dataLayer.Status.TooLow;
    }
    else if (Temperature > beer.Maximum){
        status = dataLayer.Status.TooHigh;
    }
    UpdateStatus(Index, Id, Temperature, status);
}

function UpdateStatus(Index, Id, Temperature, Status){
    var beer = {'Id': Id, 'Temperature' : Temperature, 'Status': Status, 'LastUpdated': new Date()};
    dataLayer.SetCargo([beer]);
    GetTemperature(++Index);
}

exports.GetCargoConfig = GetCargoConfig;