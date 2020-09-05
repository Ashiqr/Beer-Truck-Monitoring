'use strict'

const basicData = require('./basicData.json');

class DataLayer{
   
    constructor() {
        this.beerConfigBasic = basicData;

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

        beers.forEach(beer => {
            var index = this.beerCurrentCargo.findIndex(b => b.Id === beer.Id);
            if (index === -1){
                this.beerCurrentCargo.push({'Id': beer.Id, 'Temperature' : beer.Temperature, 
                "Status": beer.Status, "LastUpdated": beer.LastUpdated, 'Name': beer.Name});
            }
            else{
                this.beerCurrentCargo[index].Temperature = beer.Temperature;
                this.beerCurrentCargo[index].Status = beer.Status;
                this.beerCurrentCargo[index].LastUpdated = beer.LastUpdated;
            }
            this.AddToHistory({'Id': beer.Id, 'Temperature' : beer.Temperature, "Status": beer.Status, "LastUpdated": beer.LastUpdated})
        });
        return;
    }

    AddToHistory(Beer){
        if (this.history.length > 5000){
            this.history = [];
        }
        this.history.push(Beer);
    }

    GetHistory(BeerId){
        if (!BeerId || BeerId === '' || BeerId.toLowerCase() === 'all'){
            return this.SortHistory(this.history);
        }
        else{
            return this.SortHistory(this.FilterHistory(this.history, BeerId));
        }
    }

    SortHistory(Data){
        return Data.slice().sort((a, b) =>  b.LastUpdated - a.LastUpdated);
    }

    FilterHistory(Data, Id){
        return Data.filter((beer) => beer.Id === Id);
    }
}
module.exports = DataLayer;
