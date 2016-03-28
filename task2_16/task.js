/**
 * Created by gaochang on 2016/3/25.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    //获取输入的城市名称和污染指数
    var cityInput = document.getElementById("aqi-city-input").value;
    var valueInput = document.getElementById("aqi-value-input").value;
    //城市名正则匹配
    var regCity = /^[\u4e00-\u9fa5a-zA-Z]+$/g;
    //污染指数正则匹配
    var regValue = /^\d+$/g;
    if(regCity.test(cityInput) == false){
        alert("请输入正确的城市名称，仅包含中英文字符");
    } else if (!regValue.test(valueInput)) {
        alert("请输入正确的污染指数，仅能为正整数");
    } else {
        aqiData[cityInput.toString()] = +valueInput;
    }
    console.log(aqiData);
    return;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var aqiTable = document.getElementById("aqi-table");
    aqiTable.innerHTML = "";
    var t_row = document.createElement("tr");
    var t_city = document.createElement("td");
    var t_score = document.createElement("td");
    var t_oper = document.createElement("td");
    t_city.innerHTML = "城市";
    t_score.innerHTML = "空气质量";
    t_oper.innerHTML = "操作";
    t_row.appendChild(t_city);
    t_row.appendChild(t_score);
    t_row.appendChild(t_oper);
    aqiTable.appendChild(t_row);
    //遍历对象中所有属性渲染表格
    for (var name in aqiData){
        var newLi = document.createElement("tr");
        var cityName = document.createElement("td");
        var score = document.createElement("td");
        var oper = document.createElement("td");
        var delBtn = document.createElement("button");
        cityName.innerHTML = name;
        score.innerHTML = aqiData[name];
        delBtn.innerHTML = "删除";
        delBtn.setAttribute("city", name);
        /*难点：js闭包的运用，防止出现以下错误：for循环时动态绑定，使得onclick
        事件需要的name只能取到最后一个值而不是每一次遍历*/
        delBtn.onclick = function (asd) {
            return function (){
                delBtnHandle(asd);
            }
        }(name);
        /*delBtn.onclick = delBtnHandle;*/
        oper.appendChild(delBtn);
        newLi.appendChild(cityName);
        newLi.appendChild(score);
        newLi.appendChild(oper);
        aqiTable.appendChild(newLi);
    }
    return;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
    return;
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
    delete aqiData[city];
    renderAqiList();
    return;
}
(function() {
    window.onload = function init(){
        // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
        var addInfo = document.getElementById("add-btn");
        addInfo.addEventListener("click",addBtnHandle);
        return;
    }
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    //在生成该节点时完成
})();

