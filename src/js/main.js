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
      newTodoObject.removed = true;
      let reverseBtn = document.createElement("button");

      if (newTodoObject.removed === true) {
        let deleteItem = removeItemBtn.parentElement; //här är den specifika knappens förälder, dvs den li-tagen
        deleteItem.remove(); //ta bort li-tag
        deleteItem.removeChild(deleteItem.lastChild); //tar bort kryssknapp
        console.log(deleteItem.innerHTML + " tas bort från todo-listan"); //skriver ut texten utan kryssknappen i console

        let newRemovedObjects = new Todo(deleteItem.innerText, false, true);

        removedTodoList.push(newRemovedObjects); //lägger till nya objektet av raderad punkt i listan med borttagna saker

        let liWithRemovedItems = document.createElement("li"); //skapa ny li-tag utanför loop, för varje klick skapas det ny li
        reverseBtn.type = "button";
        reverseBtn.innerHTML = "&#8617";

        for (let i = 0; i < removedTodoList.length; i++) {
          liWithRemovedItems.innerHTML = removedTodoList[i].item;
          liWithRemovedItems.appendChild(reverseBtn);
          ulWithRemovedItems.appendChild(liWithRemovedItems);
        }
        liWithRemovedItems.className = "deletedThing"; // Fixa så att styling o classname behålls från tidigare, något med true/false
        console.log(removedTodoList);
      } else {
        console.log("remove = false");
      }

      reverseBtn.addEventListener("click", () => {
        newTodoObject.removed = false;

        let bringBackItem = reverseBtn.parentElement; //li-tagen som ligger i borttagna saker
        bringBackItem.remove(); //li-tag tas bort från ul-listan
        bringBackItem.removeChild(bringBackItem.lastChild); //tar bort reverse button
        console.log(bringBackItem.innerHTML + " läggs tillbaka i todo-listan");
        let broughtBackItems = new Todo(bringBackItem.innerText, false, false);
        removedTodoList.pop(broughtBackItems); //ta bort sista objekt
        totalTodoList.push(broughtBackItems); //lägger till objektet på todo-list igen.

        console.log(totalTodoList);
        console.log(removedTodoList);
        showMyTodos(bringBackItem.innerHTML); //skicka tillbaka texten på li-tagen som ska reversas
        // pop  let newTodoObject = new Todo(content, false, false);
      });
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
