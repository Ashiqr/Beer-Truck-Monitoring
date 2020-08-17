const beerConfigBasic = [
        {'Id': 'beer1', 'Name' : 'Pilsner', 'Minimum': 4, 'Maximum': 6},
        {'Id': 'beer2', 'Name' : 'IPA', 'Minimum': 5, 'Maximum': 6},
        {'Id': 'beer3', 'Name' : 'Lager', 'Minimum': 4, 'Maximum': 7},
        {'Id': 'beer4', 'Name' : 'Stout', 'Minimum': 6, 'Maximum': 8},
        {'Id': 'beer5', 'Name' : 'Wheat beer', 'Minimum': 3, 'Maximum': 5},
        {'Id': 'beer6', 'Name' : 'Pale Ale', 'Minimum': 4, 'Maximum': 6},
    ];

const Status = {
    'Normal' : 0,
    'TooLow' : 1,
    'TooHigh': 2,
    'Fault': 3
}

var history = [];
var beerCurrentCargo = [];

function GetCargoConfigBasic(){
    return beerConfigBasic;
}

function GetCargoById(Id){
    return beerCurrentCargo.find(({id}) => Id === Id);
}

function GetCargoByIndex(Index){
    if (Index < 0 || Index >= beerCurrentCargo.length){
        return null;
    }
    return beerCurrentCargo[Index];
}

function SetCargo(beers){
    if (!beers || !Array.isArray(beers))
        throw 'Invalid Beer Data';

    var count = 0;
    beers.forEach(beer => {
        var index = beerCurrentCargo.findIndex(b => b.Id === beer.Id)
        if (index === -1){
            beerCurrentCargo.push({'Id': beer.Id, 'Temperature' : beer.Temperature, "Status": beer.Status, "LastUpdated": beer.LastUpdated});
        }
        else{
            beerCurrentCargo[index].Temperature = beer.Temperature;
            beerCurrentCargo[index].Status = beer.Status;
            beerCurrentCargo[index].LastUpdated = beer.LastUpdated;
        }
        count++;
    });
    return count;
}

exports.GetCargoConfigBasic = GetCargoConfigBasic;
exports.GetCargoById = GetCargoById;
exports.GetCargoByIndex = GetCargoByIndex;
exports.SetCargo = SetCargo;
exports.Status = Status;