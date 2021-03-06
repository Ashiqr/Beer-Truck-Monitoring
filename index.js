var server = require('diet');
var fs = require('fs');
var static = require('diet-static')({ path: './frontend/static' })
const DataLayer = require('./backend-data-layer/data-layer');
const Service = require('./backend-service/service');
const API = require('./frontend-service/api');
const configuration = require('./configuration.json');

var dataLayer = new DataLayer();
var api = new API(dataLayer);
var app = server();
app.listen('http://localhost:8000');

app.get('/', function($){
    $.header('content-type', 'text/html')
    fs.readFile('./frontend/index.html', function(error, data){
        if(!error) {
            $.html(data);
        } else {
            throw error;
        }
    })
});

app.get('/configuration/data', function($){
    $.data = api.GetConfigurationData();
    $.json();
});

app.get('/history/data/:beerId', function($){
    $.data = api.GetHistoryData($.params.beerId);
    $.json();
});

app.get('/dashboard/data/', function($){
    $.data = api.GetDashboardData();
    $.json();
});

app.missing(function($){
    $.header('content-type', 'text/html')
    fs.readFile('./frontend/404.html', function(error, data){
        if(!error) {
            $.html(data);
        } else {
            throw error;
        }
    })
})

app.footer(static);

console.log('Starting monitoring service');

function Start(){
    var interval = parseInt(configuration.ServerInterval);

    if(isNaN(interval)){
        interval = 60000;
    }
    else{
        interval = Math.abs(interval);
    }
    setInterval(() => {
        Service.Drive(dataLayer).then((result) => {
            dataLayer.SetCargo(result);
            return;
        });
    }, interval);
    return;
}
Start();

console.log('Monitoring service running');
