const beerConfigBasic = [
        {'Id': 'beer1', 'Name' : 'Pilsner', 'Minimum': 4, 'Maximum': 6},
        {'Id': 'beer2', 'Name' : 'IPA', 'Minimum': 5, 'Maximum': 6},
        {'Id': 'beer3', 'Name' : 'Lager', 'Minimum': 4, 'Maximum': 7},
        {'Id': 'beer4', 'Name' : 'Stout', 'Minimum': 6, 'Maximum': 8},
        {'Id': 'beer5', 'Name' : 'Wheat beer', 'Minimum': 3, 'Maximum': 5},
        {'Id': 'beer6', 'Name' : 'Pale Ale', 'Minimum': 4, 'Maximum': 6},
    ];

var beerCurrentCargo = [];

function GetCargoConfigBasic(){
    return beerConfigBasic;
}

function GetCargo(){
    return beerCurrentCargo;
}

function SetCargo(beers){
    if (!beers || !Array.isArray(beers))
        throw 'Invalid Beer Data';

    var count = 0;
    beers.forEach(beer => {
        var index = beerCurrentCargo.findIndex(b => b.Id === beer.Id)
        if (index === -1){
            beerCurrentCargo.push({'Id': beer.Id, 'Temperature' : beer.Temperature});
        }
        else{
            beerCurrentCargo[index].Temperature = beer.Temperature;
        }
        count++;
    });
    return count;
}

exports.GetCargoConfigBasic = GetCargoConfigBasic;
exports.GetCargo = GetCargo;
exports.SetCargo = SetCargo;