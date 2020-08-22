class DataLayer{
    
    constructor() {
        this.beerConfigBasic = [
            {'Id': 'beer1', 'Name' : 'Pilsner', 'Minimum': 4, 'Maximum': 6},
            {'Id': 'beer2', 'Name' : 'IPA', 'Minimum': 5, 'Maximum': 6},
            {'Id': 'beer3', 'Name' : 'Lager', 'Minimum': 4, 'Maximum': 7},
            {'Id': 'beer4', 'Name' : 'Stout', 'Minimum': 6, 'Maximum': 8},
            {'Id': 'beer5', 'Name' : 'Wheat beer', 'Minimum': 3, 'Maximum': 5},
            {'Id': 'beer6', 'Name' : 'Pale Ale', 'Minimum': 4, 'Maximum': 6},
            ];

        this.Status = {
            'Normal' : 0,
            'TooLow' : 1,
            'TooHigh': 2,
            'Fault': 3
        }
        this.history = [];
        this.beerCurrentCargo = [];
        this.SetCargo(this.GetCargoConfigBasic());
    }

    GetCargoConfigBasic(){
        return this.beerConfigBasic;
    }

    GetCargoConfigById(Id){
        return this.beerConfigBasic.find(beer => beer.Id === Id);
    }

    GetCargo(){
        return this.beerCurrentCargo;
    }

    GetCargoById(Id){
        return this.beerCurrentCargo.find(beer => beer.Id === Id);
    }

    GetCargoByIndex(Index){
        if (Index < 0 || Index >= this.beerCurrentCargo.length){
            return null;
        }
        return this.beerCurrentCargo[Index];
    }

    SetCargo(beers){
        if (!beers || !Array.isArray(beers))
            throw 'Invalid Beer Data';

        var count = 0;
        beers.forEach(beer => {
            var index = this.beerCurrentCargo.findIndex(b => b.Id === beer.Id)
            if (index === -1){
                this.beerCurrentCargo.push({'Id': beer.Id, 'Temperature' : beer.Temperature, "Status": beer.Status, "LastUpdated": beer.LastUpdated});
            }
            else{
                this.beerCurrentCargo[index].Temperature = beer.Temperature;
                this.beerCurrentCargo[index].Status = beer.Status;
                this.beerCurrentCargo[index].LastUpdated = beer.LastUpdated;
            }
            this.AddToHistory({'Id': beer.Id, 'Temperature' : beer.Temperature, "Status": beer.Status, "LastUpdated": beer.LastUpdated})
            count++;
        });
        return count;
    }

    AddToHistory(Beer){
        if (this.history.length > 5000){
            this.history = [];
        }
        this.history.push(Beer);
    }
}
module.exports = DataLayer;
