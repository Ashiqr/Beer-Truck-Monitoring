var server = require('diet');
var app = server();
app.listen('http://localhost:8000');

app.get('/', function($){
    $.end('Hello World!')
});

