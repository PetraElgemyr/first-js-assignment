class Todo {
  constructor(item, finished, removed) {
    this.item = item;
    this.finished = finished;
    this.removed = removed;
  }
}

window.onload = function () {
  startTodo();
  addItemToList();
};

let totalTodoList = [];
let removedTodoList = [];

function startTodo() {
  let myTodoList = ["Tvätta", "Handla", "Plugga", "Städa"];

  for (let i = 0; i < myTodoList.length; i++) {
    let thingTodo = myTodoList[i];
    showMyTodos(thingTodo); //anropa och skicka med alla saker i min lista
  }
}

function showMyTodos(content) {
  let myContainerDiv = document.getElementById("myContainer"); //hitta min container
  let myUlTag = document.getElementById("myList"); //hitta min ul-tag
  let inputTag = document.getElementById("newItem"); //hitta min input, behövs ej men ha kvar
  let myLiTag = document.createElement("li");
  let removeItemBtn = document.createElement("button");
  let ulWithRemovedItems = document.getElementById("removedItemsList");

  if (content !== "") {
    myLiTag.className = "myTodoItem";

    let newTodoObject = new Todo(content, false, false);
    totalTodoList.push(newTodoObject); //här läggs det till objekt newTodoObject i min lista [newTodoObject, newTodoObject,...]
    console.log(totalTodoList);

    let spanInLi = document.createElement("span");

    myLiTag.innerHTML = content;
    myLiTag.addEventListener("click", () => {
      checkedItem(myLiTag);
    });

    removeItemBtn.type = "button";
    removeItemBtn.className = "removeBtn";
    removeItemBtn.innerHTML = "&#10005;";

    myUlTag.appendChild(myLiTag);
    myLiTag.appendChild(removeItemBtn);

    //Om man klickar på li-tagen för att markera klar

    removeItemBtn.addEventListener("click", () => {
      let deleteItem = removeItemBtn.parentElement; //här är den specifika knappens förälder, dvs den li-tagen
      deleteItem.remove(); //ta bort li-tag
      deleteItem.removeChild(deleteItem.lastChild); //tar bort kryssknapp
      console.log(deleteItem.innerHTML); //skriver ut texten utan kryssknappen i console

      // let thingy = deleteItem.innerText;
      // console.log(thingy);
      let newRemovedObjects = new Todo(deleteItem.innerText, false, false);

      removedTodoList.push(newRemovedObjects); //lägger till nya objektet av raderad punkt i listan med borttagna saker

      // localStorage.setItem("thingsRemoved", JSON.stringify(removedTodoList));

      // let listOfRemovedThings = JSON.parse(
      //   localStorage.getItem("thingsRemoved")
      // );
      // console.log(listOfRemovedThings);

      let liWithRemovedItems = document.createElement("li"); //skapa ny li-tag utanför loop, för varje klick skapas det ny li

      for (let i = 0; i < removedTodoList.length; i++) {
        liWithRemovedItems.innerHTML = removedTodoList[i].item;
        ulWithRemovedItems.appendChild(liWithRemovedItems);
      }
      liWithRemovedItems.className = "deletedThing";
    });
  } else {
    alert("Skriv in något att lägga till innan du klickar!"); //Sorry, kommer bara avnvända alert här för att få fram en tydlig varning. Aldrig mer :)
  }
}

function addItemToList() {
  let addItemBtn = document.getElementById("addItemBtn");
  addItemBtn.addEventListener("click", () => {
    showMyTodos(document.getElementById("newItem").value);
    /*till funktionen showMyTodos skickar jag ett värde. Input-tagens value. Det värdet jag skickar är det som står i inputen. 
    Det värdet tas emot som thingTodo i början av ShowMyTodos */
    document.getElementById("newItem").value = "";
  });
}

function checkedItem(liTag) {
  let myLiTag = liTag;
  myLiTag.classList.toggle("__checked");
}

// function removeItemFromList(btn, anObject, list) {
//   let removeItemBtn = btn;
//   let removedThing = removeItemBtn.parent;

//   if ((anObject.removed = true)) {
//     removeItemBtn.classList.toggle;
//   }
// }
