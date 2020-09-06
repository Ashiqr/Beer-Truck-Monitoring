'use strict'
class API {
    constructor(DataLayer) {
        this.dataLayer = DataLayer;
    }

    GetConfigurationData(){
        return this.dataLayer.GetCargoConfigBasic();
    }

    GetHistoryData(BeerId){
        return this.dataLayer.GetHistory(BeerId);
    }

    GetDashboardData(){
        var data = this.dataLayer.GetCargo();
        data.sort((a, b) => b.Status - a.Status);
        data.forEach(beer => {
            switch(beer.Status){
                case this.dataLayer.Status.Normal: {
                    beer.Message = 'Normal';
                    break;
                }
                case this.dataLayer.Status.TooLow: {
                    beer.Message = 'Low';
                    break;
                }
                case this.dataLayer.Status.TooHigh: {
                    beer.Message = 'High';
                    break;
                }
                case this.dataLayer.Status.Fault: {
                    beer.Message = 'Sensor Fault';
                    break;
                }
            }
        });
        return data;
    }
}

module.exports = API;
