window.onload = function () {
  startTodo();
};

let totalTodoList = [];

function startTodo() {
  let myTodoList = ["Tvätta", "Handla", "Plugga", "Städa"];

  for (let i = 0; i < myTodoList.length; i++) {
    let thingTodo = myTodoList[i];
    showMyTodos(thingTodo); //anropa och skicka med alla saker i min lista
  }
}

function showMyTodos(thingTodo) {
  let myContainerDiv = document.getElementById("myContainer");
  let myUlTag = document.getElementById("myList");
  let myLiTag = document.createElement("li");
  totalTodoList.push(thingTodo);
  myLiTag.innerHTML = thingTodo;
  myContainerDiv.appendChild(myUlTag);
  myUlTag.appendChild(myLiTag);
}
