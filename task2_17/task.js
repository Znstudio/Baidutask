/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    var chartDiv = document.getElementById("aqi-chart-wrap");
    /*chartDiv.style.position = "relative";*/
    chartDiv.style.left = "0px";
    chartDiv.style.width = "1500px";
    chartDiv.style.height = "620px";
    chartDiv.style.top = "10px";
    chartDiv.style.border = "1px solid black";

    //按每日渲染
    if(pageState.nowGraTime === "day"){
        chartDiv.innerHTML = "";
        for(var p in chartData[pageState.nowSelectCity].day) {
            var sub = document.createElement("div");
            sub.setAttribute("id",p);
            sub.setAttribute("title","日期:" + p + ";空气指数:" + chartData[pageState.nowSelectCity].day[p]);
            sub.style.width = "5px" ;
            sub.style.height = chartData[pageState.nowSelectCity].day[p];
            sub.style.float = "left";
            sub.style.marginLeft = "5px";
            sub.style.marginRight = "5px";
            var dis = 620 - chartData[pageState.nowSelectCity].day[p];
            sub.style.marginTop = dis;
/*            var totest = 0 - chartData[pageState.nowSelectCity].day[p];
            sub.style.marginBottom = totest;*/
            if(chartData[pageState.nowSelectCity].day[p] <= 50){
                sub.style.backgroundColor = "green";
            } else if(chartData[pageState.nowSelectCity].day[p] <= 100) {
                sub.style.backgroundColor = "blue";
            } else if(chartData[pageState.nowSelectCity].day[p] <= 150) {
                sub.style.backgroundColor = "yellow";
            } else if(chartData[pageState.nowSelectCity].day[p] <= 200) {
                sub.style.backgroundColor = "orange";
            }  else if(chartData[pageState.nowSelectCity].day[p] <=250) {
                sub.style.backgroundColor = "red";
            } else {
                sub.style.backgroundColor = "black";
            }
            chartDiv.appendChild(sub);
        }
    //按每周渲染
    } else if(pageState.nowGraTime === "week") {
        chartDiv.innerHTML = "";
        for(var p in chartData[pageState.nowSelectCity].week) {
            for(var ae in chartData[pageState.nowSelectCity].week[p]){
                var sub = document.createElement("div");
                sub.setAttribute("id",p);
                sub.setAttribute("title","周次:" + p + "第" + ae + "周;平均空气指数:" + chartData[pageState.nowSelectCity].week[p][ae]);
                sub.style.width = "10px" ;
                sub.style.height = chartData[pageState.nowSelectCity].week[p][ae];
                sub.style.float = "left";
                sub.style.marginLeft = "5px";
                sub.style.marginRight = "5px";
                var dis = 620 - chartData[pageState.nowSelectCity].week[p][ae];
                sub.style.marginTop = dis;

                if(chartData[pageState.nowSelectCity].week[p][ae] <= 50){
                    sub.style.backgroundColor = "green";
                } else if(chartData[pageState.nowSelectCity].week[p][ae] <= 100) {
                    sub.style.backgroundColor = "blue";
                } else if(chartData[pageState.nowSelectCity].week[p][ae] <= 150) {
                    sub.style.backgroundColor = "yellow";
                } else if(chartData[pageState.nowSelectCity].week[p][ae] <= 200) {
                    sub.style.backgroundColor = "orange";
                }  else if(chartData[pageState.nowSelectCity].week[p][ae] <=250) {
                    sub.style.backgroundColor = "red";
                } else {
                    sub.style.backgroundColor = "black";
                }

                chartDiv.appendChild(sub);
            }
        }
    //按每月渲染
    } else {
        chartDiv.innerHTML = "";
        for(var p in chartData[pageState.nowSelectCity].month) {
            var sub = document.createElement("div");
            sub.setAttribute("id",p);
            sub.setAttribute("title","2016年" + p + "月" + ";平均空气指数:" + chartData[pageState.nowSelectCity].month[p]);
            sub.style.width = "20px" ;
            sub.style.height = chartData[pageState.nowSelectCity].month[p];
            sub.style.float = "left";
            sub.style.marginLeft = "5px";
            sub.style.marginRight = "5px";
            var dis = 620 - chartData[pageState.nowSelectCity].month[p];
            sub.style.marginTop = dis;

            if(chartData[pageState.nowSelectCity].month[p] <= 50){
                sub.style.backgroundColor = "green";
            } else if(chartData[pageState.nowSelectCity].month[p] <= 100) {
                sub.style.backgroundColor = "blue";
            } else if(chartData[pageState.nowSelectCity].month[p] <= 150) {
                sub.style.backgroundColor = "yellow";
            } else if(chartData[pageState.nowSelectCity].month[p] <= 200) {
                sub.style.backgroundColor = "orange";
            }  else if(chartData[pageState.nowSelectCity].month[p] <=250) {
                sub.style.backgroundColor = "red";
            } else {
                sub.style.backgroundColor = "black";
            }

            chartDiv.appendChild(sub);
        }
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化

    // 设置对应数据
    if(document.getElementById("day").checked){
        pageState.nowGraTime = "day";
    } else if(document.getElementById("week").checked) {
        pageState.nowGraTime = "week";
    } else {
        pageState.nowGraTime = "month";
    }
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    var currentCity = document.getElementById("city-select").value;
    // 设置对应数据
    pageState.nowSelectCity = currentCity;

    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var radios = document.getElementsByTagName("input");
    for (var i=0;i<radios.length;i++){
        radios[i].onclick = (function(asd){
            return function (){
                graTimeChange(asd);
            }
        })(radios[i].value);
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var sel = document.getElementById("city-select");
    sel.innerHTML = "";
    for(var city in aqiSourceData){
        var opt = document.createElement("option");
        opt.setAttribute("id",city);
        opt.innerHTML = city;
        sel.appendChild(opt);
    }
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    sel.onchange = function(){
        citySelectChange();
    }
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    chartData = {};
    for (var t in aqiSourceData) {
        chartData[t] = {};
        /*直接处理每日数据*/
        chartData[t].day = aqiSourceData[t];

        chartData[t].week = {
            "2016-01" : {},
            "2016-02" : {},
            "2016-03" : {}
        };
        chartData[t].month = {
            1 : "",
            2 : "",
            3 : ""
        };

        //处理每周数据
        var weekCount1 = getWeekCount(2016,01);
        for(var k=0;k<weekCount1;k++){
            var everyWeekData = 0;
            var weekSum = 0;
            var from = split_date[k][0];
            var to = split_date[k][1];
            for(var m in aqiSourceData[t]) {
                var today = new Date(m);
                if((today.getMonth() + 1) === 1){
                    if (from <= today.getDate() && today.getDate() <= to){
                        weekSum += aqiSourceData[t][m];
                    }
                }
            }
            chartData[t].week["2016-01"][k+1] = Math.ceil(weekSum/(to-from+1));
        }
        var weekCount2 = getWeekCount(2016,02);
        for(var k=0;k<weekCount2;k++){
            var weekSum = 0;
            var from = split_date[k][0];
            var to = split_date[k][1];
            for(var m in aqiSourceData[t]) {
                var today = new Date(m);
                if((today.getMonth() + 1) === 1){
                    if (from <= today.getDate() && today.getDate() <= to){
                        weekSum += aqiSourceData[t][m];
                    }
                }
            }
            chartData[t].week["2016-02"][k+1] = Math.ceil(weekSum/(to-from+1));
        }
        var weekCount3 = getWeekCount(2016,03);
        for(var k=0;k<weekCount3;k++){
            var weekSum = 0;
            var from = split_date[k][0];
            var to = split_date[k][1];
            for(var m in aqiSourceData[t]) {
                var today = new Date(m);
                if((today.getMonth() + 1) === 1){
                    if (from <= today.getDate() && today.getDate() <= to){
                        weekSum += aqiSourceData[t][m];
                    }
                }
            }
            chartData[t].week["2016-03"][k+1] = Math.ceil(weekSum/(to-from+1));
        }

        //处理每月数据
        var jan_sum = 0 , feb_sum = 0 , mar_sum = 0;
        var jan_dayCount = 0 , feb_dayCount = 0 , mar_dayCount = 0;
        for(var m in aqiSourceData[t]) {
            var today = new Date(m);
            if((today.getMonth() + 1) === 1){
                jan_dayCount++;
                jan_sum += aqiSourceData[t][m];
            }
            if((today.getMonth() + 1) === 2){
                feb_dayCount++;
                feb_sum += aqiSourceData[t][m];
            }
            if((today.getMonth() + 1) === 3){
                mar_dayCount++;
                mar_sum += aqiSourceData[t][m];
            }
        }
        chartData[t].month[1] = Math.ceil(jan_sum/jan_dayCount);
        chartData[t].month[2] = Math.ceil(feb_sum/feb_dayCount);
        chartData[t].month[3] = Math.ceil(mar_sum/mar_dayCount);
    }
    console.log(chartData);
}

/**
 * 获取指定月份所含周数
 */
var split_date = [];
function getWeekCount(year, month) {
    split_date = [];
    var d = new Date();
    // 获取该年该月第一天时间信息
    d.setFullYear(year, month - 1, 1);
    //获取该月1号是星期几
    var w1 = d.getDay();

    //计算该月一共有多少天，设置为month 和 0 表示，
    // 即下一个月的第零天，也就是上个月（待求天数的月）的最后一天
    d.setFullYear(year, month, 0);
    //dd表示该月总天数
    var dd = d.getDate();

    var first_mon = 0;
    //如果第一天不是星期一，则找出第一个星期一是几号(first_mon号)
    if(w1 == 0){
        first_mon = 2;
        split_date.push([1,first_mon - 1]);
        split_date.push([first_mon,first_mon + 6]);
    } else if (w1 == 1) {
        first_mon = 1;
        split_date.push([1,first_mon + 6]);
    } else {
        first_mon = 9-w1;
        split_date.push([1,first_mon - 1]);
        split_date.push([first_mon,first_mon + 6]);
    }
    split_date.push([first_mon + 7,first_mon + 13]);
    split_date.push([first_mon + 14,first_mon + 20]);
    if((first_mon + 27) >= dd){
        split_date.push([first_mon + 21,dd]);
    } else {
        split_date.push([first_mon + 21,first_mon + 27]);
        split_date.push([first_mon + 28,dd]);
    }
    return split_date.length;
}

/**
 * 初始化函数
 */
(function() {
    window.onload = function init(){
        initGraTimeForm();
        initCitySelector();
        initAqiChartData();
    }
})();

