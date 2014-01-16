document.getElementById("quit").onmousedown = function() {
    Qt.quit();
}

function fillList(count){
    var list = document.getElementById('list');
    var ul = document.createElement("ul");
    for (var i = 0; i < count; i++) {
        var li = document.createElement("li");
        li.className = 'link';
        var a = document.createElement("a");
        a.innerHTML = "link" + i;
        a.onclick = document.getElementById("button").onclick = function(){
            updateResult(this.innerHTML);
        };
        li.appendChild(a);
        list.appendChild(li);
    }
}

fillList(20);

function updateResult(text) {
    document.getElementById("result").innerHTML = text;
}

document.getElementById("button").onclick = function () {
    updateResult("button");
};

document.getElementById("input").onkeydown = function (event) {
    document.getElementById("input")
    if (event.keyCode === 13) {
        updateResult(event.target.value);
        event.target.value = "";
    }
}

function allowDrop (event) {
    event.preventDefault();
}

function dragStart (event) {
    event.preventDefault();
}

function drop (event) {
    event.preventDefault();
    var id = event.dataTransfer.getData("id");
    var target = event.target;
    var x = event.clientX;
    var y = event.clientY;
    updateResult(x + ',' + y);
}

function getPos(element){
    var x = 0;
    var y = 0;
    while(true){
        x += element.offsetLeft;
        y += element.offsetTop;
        if(element.offsetParent === null){
            break;
        }
        element = element.offsetParent;
    }
    return {'x': x, 'y': y};
}

var drag_object = document.getElementById('drag_object');
drag_object.draggable = true;
drag_object.onmousedown = function(e) {
    var self = this;

    var pos = getPos(self);
    var start = {'x': e.clientX, 'y': e.clientY};
    var element_offset = {'x': start.x - pos.x, 'y': start.y - pos.y};

    function moveAt(e) {
        self.style.left = e.clientX - element_offset.x +'px';
        self.style.top = e.clientY - element_offset.y +'px';
    }

    this.style.position = 'absolute';
    moveAt(e);
    document.body.appendChild(this);

    this.style.zIndex = 1000;

    document.onmousemove = function(event) {
        moveAt(event);
    }

    this.onmouseup = function(event) {
        var move_offset = {'x': event.clientX - start.x, 'y': event.clientY - start.y};
        updateResult(move_offset.x + "," + move_offset.y);
        document.onmousemove = self.onmouseup = null;
    }
}
drag_object.ondragstart = dragStart;

var drop_field = document.getElementById('drop_field');
drop_field.ondragover = allowDrop;
drop_field.ondrop = drop;

function printMouseButton(event) {
    console.log('test');
    updateResult(event.button);
}

var click_tester = document.getElementById("click_tester");
click_tester.onclick = printMouseButton;
