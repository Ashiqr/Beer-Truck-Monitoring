var server = require('diet');
const DataLayer = require('./backend-data-layer/data-layer');
const Service = require('./backend-service/service');

console.log('Starting monitoring service')
var dataLayer = new DataLayer();
setInterval(() => {
    var service = new Service(dataLayer);
    dataLayer = service.Drive();
}, 60000);
console.log('Monitoring service running');

console.log('Starting web service');
var app = server();
app.listen('http://localhost:8000');

app.get('/', function($){
    var dash = dataLayer.GetCargo();
    var result = '';
    dash.forEach(beer => {
        result += beer.Id + ' ' + beer.Status + '< br/>';
    });
    $.end(result);
});