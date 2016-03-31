var fifo = [];

Array.prototype.del = function(index){
    if(isNaN(index)||index>=this.length){
        return false;
    }
    for(var i= 0,n=0;i<index;i++){
        this[n++] = this[i];
    }
    for(var k=index+1;k<this.length;k++){
        this[n++] = this[k];
    }
    this.length -= 1;
}

function leftIn(){
    var inputVal = document.getElementById("number").value;
    fifo.unshift(inputVal);
    renderDiv();
}

function rightIn(){
    var inputVal = document.getElementById("number").value;
    fifo.push(inputVal);
    renderDiv();
}

function leftOut(){
    alert(fifo.shift());
    renderDiv();
}

function rightOut(){
    alert(fifo.pop());
    renderDiv();
}

function renderDiv (){
    var par_div = document.getElementById("wrap");
    par_div.innerHTML = "";
    for(var k=0;k<fifo.length;k++){
        var newEle = document.createElement("div");
        newEle.setAttribute("id","ele");
        newEle.onclick = (function(asd){
            return function (){
                fifo.del(asd);
                renderDiv();
            }
        })(k);
        newEle.innerHTML = fifo[k];
        par_div.appendChild(newEle);
    }
}
