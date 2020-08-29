'use strict'
var https = require('https');
const configuration = require('../configuration.json');

class Service{
    constructor(DataLayer) {
        this.dataLayer = DataLayer;
    }

    Drive(){
        try{
            this.GetTemperature(0);
            return this.dataLayer;
        }
        catch(ex){
            console.log(ex);
        }
    }

    GetTemperature(Index) {
        var beer = this.dataLayer.GetCargoByIndex(Index);
        if (beer){
            var URL = configuration.SensorURL + beer.Id;
            https.get(URL, (resp) => {            
                let stream = '';
                resp.on('data', (chunk) => {
                    stream += chunk;
                });

                resp.on('end', () => {
                    var data = JSON.parse(stream);
                    this.Success(Index, beer.Id, data.temperature)
                });
            }).on("error", (err) => {
                this.Error(Index, beer.Id);
            });
        }
    }

    Success(Index, Id, Temperature){
        var beer = this.dataLayer.GetCargoConfigById(Id);
        if (!beer){
            throw 'Invalid Id: ' + Id;
        }
        var status = this.EvaluateTemperature(beer, Temperature);
        this.UpdateStatus(Index, Id, Temperature, status);
        this.GetTemperature(++Index);
    }

    Error(Index, Id){
        this.UpdateStatus(Index, Id, null, this.dataLayer.Status.Fault);
        this.GetTemperature(++Index);
    }

    EvaluateTemperature(Beer, Temperature){
        var status = this.dataLayer.Status.Normal;
        if (Temperature < Beer.Minimum){
            status = this.dataLayer.Status.TooLow;
        }
        else if (Temperature > Beer.Maximum){
            status = this.dataLayer.Status.TooHigh;
        }
        return status;
    }

    UpdateStatus(Index, Id, Temperature, Status){
        var beer = {'Id': Id, 'Temperature' : Temperature, 'Status': Status, 'LastUpdated': new Date()};
        this.dataLayer.SetCargo([beer]);
    }
}
module.exports = Service;
