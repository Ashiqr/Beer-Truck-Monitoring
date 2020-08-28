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
        data.sort((a, b) =>  b.Status - a.Status);
        data.forEach(beer => {
            switch(beer.Status){
                case 0: {
                    beer.Message = 'Normal';
                    break;
                }
                case 1: {
                    beer.Message = 'Low';
                    break;
                }
                case 2: {
                    beer.Message = 'High';
                    break;
                }
                case 3: {
                    beer.Message = 'Sensor Fault';
                    break;
                }
            }
        });
        return data;
    }
}

module.exports = API;
