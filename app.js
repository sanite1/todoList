var add = document.querySelector(".add-btn");
var remove = document.querySelector(".remove-btn");
var update = document.querySelector(".update-btn");
var del = document.querySelectorAll(".del");
var todoInput = document.querySelector(".todo-input");
var list = document.querySelector("ul");
console.log(list);
function getTodoList() {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState === 4) {
            if(this.status >= 200 || this.status <=299) {
                var response = JSON.parse(this.responseText);
                console.log(response);
                for (var i = 0; i < response.length; i++) {
                    list.appendChild(createTodoDynamically(response[i].id, response[i].title));
                }
            }
            else {
                alert("Call failed");
            }
        } 
    }
    http.open("GET", "https://jsonplaceholder.typicode.com/todos", true);
    http.send();
}

function createListDynamically() {
    var http = new XMLHttpRequest();
    http.open("POST", "https://jsonplaceholder.typicode.com/todos", true);
    http.onreadystatechange = function() {
        if (this.readyState === 4) {
            if(this.status >= 200 || this.status <=299) {
                var res = JSON.parse(this.responseText);
                list.appendChild(createTodoDynamically(res.id, inputedItem));
                
                console.log("Item added");
            }
            else {
                alert("Call failed");
            }
        } 
    }
    var obj = {
        "userId": 1,
        "title": inputedItem,
        "completed": false
    }
    obj = JSON.stringify(obj);
    http.send(obj);
}

function createTodoDynamically (id, item) {
    var newListItem = document.createElement("li");
    var textNode = document.createTextNode(item);
    newListItem.appendChild(textNode);
    var newIcon = document.createElement("i");
    var newIconText = document.createTextNode("DELETE");
    newIcon.appendChild(newIconText);
    newListItem.appendChild(newIcon);
    newIcon.classList.add("del");
    newListItem.classList.add("item");
    newListItem.id = id;
    newIcon.addEventListener("click", function() {
        var old = this.parentElement;
        list.removeChild(old);
    });
    return newListItem;
}

function createNewNode() {
    var newListItem = document.createElement("li");
    var textNode = document.createTextNode(inputedItem);
    newListItem.appendChild(textNode);
    var newIcon = document.createElement("i");
    var newIconText = document.createTextNode("DELETE");
    newIcon.appendChild(newIconText);
    newListItem.appendChild(newIcon);
    newIcon.classList.add("del");
    newListItem.classList.add("item");
    newIcon.addEventListener("click", function() {
        var old = this.parentElement;
        list.removeChild(old);
    });
    return newListItem;
}
function addListItem() {
    if (inputedItem !== undefined && inputedItem !== null && inputedItem !== "") {
        var newListItem = createNewNode();
        list.appendChild(newListItem);
        todoInput.value = "";
        inputedItem = "";
        
    }
    else {
        alert("Enter a valid to-do item");
    }
}
var inputedItem;
todoInput.addEventListener("input", function(e) {
    inputedItem = e.target.value;
})
todoInput.addEventListener("keyup", function(e) {
    // 
    if (e.keyCode === 13) {
        addListItem();
    }
    
});
add.addEventListener("click", createListDynamically);
update.addEventListener("click", function() {
    var newListItem = createNewNode();
    var oldListItem = list.firstElementChild;

    list.replaceChild(newListItem, oldListItem);
});
remove.addEventListener("click", function() {
    
    var oldListItem = list.firstElementChild;
    list.removeChild(oldListItem);
});

for (var i = 0; i < del.length; i++) {
    del[i].addEventListener("click", function(){
        var old = this.parentElement;
        list.removeChild(old);
    });
}

getTodoList();