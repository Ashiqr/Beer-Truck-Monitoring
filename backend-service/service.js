'use strict'
var https = require('https');
const configuration = require('../configuration.json');
const { resolve } = require('path');

function Drive(DataLayer) {
    try{
        return new Promise(async function (resolve) {
            var beers = DataLayer.GetCargo();
            var result = [];
            var index = 0;
            var beerCount  = beers.length;

            do{
                await GetTemperature(DataLayer, beers[index].Id).then((temperature) => {
                    if(temperature){
                        result.push(Success(DataLayer, beers[index].Id, temperature));
                    }
                    else{
                        result.push(Error(DataLayer, beers[index].Id));
                    }
                    index++;
                });
            }
            while(index < beerCount);

            resolve(result);
        });
    }
    catch(ex){
        console.log(ex);
    }
}

function GetTemperature(Id) {
    return new Promise(function (resolve) {
        https.get(configuration.SensorURL + Id, (resp) => {            
            var stream = '';
            resp.on('data', (chunk) => {
                stream += chunk;
            });

            resp.on('end', () => {
                var data = JSON.parse(stream);
                stream = null;
                resolve(data.temperature);
            });
        }).on("error", (err) => {
            resolve(null);
        });
    });
}

function Success(DataLayer, Id, Temperature){
    var beer = DataLayer.GetCargoConfigById(Id);
    if (!beer){
        throw 'Invalid Id: ' + Id;
    }
    var status = EvaluateTemperature(DataLayer, beer, Temperature);
    return UpdateStatus(Id, Temperature, status);
}

function Error(DataLayer, Id){
    return UpdateStatus(Id, null, DataLayer.Status.Fault);
}

function EvaluateTemperature(DataLayer, Beer, Temperature){
    if (Temperature < Beer.Minimum){
        return DataLayer.Status.TooLow;
    }
    else if (Temperature > Beer.Maximum){
        return DataLayer.Status.TooHigh;
    }
    return DataLayer.Status.Normal;
}

function UpdateStatus(Id, Temperature, Status){
    return {'Id': Id, 'Temperature' : Temperature, 'Status': Status, 'LastUpdated': new Date()};
}

exports.Drive = Drive;
exports.EvaluateTemperature = EvaluateTemperature;
