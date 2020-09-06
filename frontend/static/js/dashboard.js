var chartOptions = {
    series: {
        shadowSize: 0,
        curvedLines: {
            apply: !0,
            active: !0,
            monotonicFit: !0
        },
        lines: {
            show: !1,
            lineWidth: 0,
            fill: 1
        }
    },
    grid: {
        borderWidth: 0,
        labelMargin: 10,
        hoverable: !0,
        clickable: !0,
        mouseActiveRadius: 6
    },
    xaxis: {
        tickDecimals: 0,
        ticks: !1
    },
    yaxis: {
        tickDecimals: 0,
        ticks: !1
    },
    legend: {
        show: !1
    }
};

var app = new Vue({
    chartOptions,
    el: '#currentStatus',
    data: {
        beers: [],
        serverStatus: 0,
        serverStatusMessage: 'Server - Online'
    },
    mounted : function () {
        this.fetchCurrentStatus();
    },
    methods: {
        fetchCurrentStatus : function () {
            jQuery.get('/dashboard/data').done (function (res) {
                var data = res;
                app.setPercentage(data);
                app.setStyle(data);
                app.beers = data;
            }).always( function (){
                setTimeout(() => {app.fetchCurrentStatus();}, 60000);
                app.checkServer();
            });

        },
        setPercentage : function (data) {
            for(var i = 0, j = data.length; i < j; i++ ){
                data[i].Percent = Math.round((data[i].Temperature + 2) / 0.12);
            }
        },
        setStyle : function (data) {
            for(var i = 0, j = data.length; i < j; i++ ){
                if (data[i].Status === 2 || data[i].Status === 1){
                    data[i].Colour = 'bg-green';
                }
                else if (data[i].Status === 3){
                    data[i].Colour = 'bg-yellow';
                }
                else{
                    data[i].Colour = '';
                }
            }
        },
        setChart : function (chartData, Name) {
            $("#curved-line-chart")[0] && $.plot($("#curved-line-chart"), [{
                data: chartData,
                lines: {
                    show: !0,
                    fill: .98
                },
                label: Name,
                stack: !0,
                color: "#fff"
            }], this.chartOptions), $(".flot-chart")[0] && ($(".flot-chart").bind("plothover", function(event, pos, item) {
                if (item) {
                    var x = item.datapoint[0].toFixed(2),
                        y = item.datapoint[1].toFixed(2);
                    $(".flot-tooltip").html(item.series.label + " of " + x + " = " + y).css({
                        top: item.pageY + 5,
                        left: item.pageX + 5
                    }).show()
                } 
                else $(".flot-tooltip").hide()
            }), $("<div class='flot-tooltip' class='chart-tooltip'></div>").appendTo("body"));
        },
        getHistory : function (Id, Name){
            jQuery.get('/history/data/' + Id).done (function (res) {
                var chartData = [];
                res.reverse();
                for(var i = 0, j = res.length; i < j; i++){
                    if(!res[i].Temperature){
                        continue;
                    }
                    chartData.push([i, parseInt(res[i].Temperature)]);
                }
                app.setChart(chartData, Name);
            });
        },
        checkServer : function () {
            var latestDate = this.beers[0] ? new Date(this.beers[0].LastUpdated) : new Date('2020-01-01');
            var difference = Math.abs(new Date() - latestDate);
            if (difference > (1000 * 60 * 2)){
                this.serverStatus = 1;
                this.serverStatusMessage = 'Server - Offline';
            }
            else{
                this.serverStatus = 0;
                this.serverStatusMessage = 'Server - Online';
            }
        }
    },
    computed: {
        firstThree() {
            return this.beers.slice(0, 3);
        },
        lastThree() {
            return this.beers.slice(3, 6);
        }
    }
});
