// selecting items 
const alert = document.querySelector(".alert"),
	list = document.querySelector(".list"),
	content = document.querySelector(".content"),
	checkbox = document.querySelectorAll("input[type=checkbox]"),
	newTodo = document.getElementById("new-todo"),
	filterAll = document.getElementById("all"),
	filterActive = document.getElementById("active"),
	filterCompleted = document.getElementById("completed"),
	clearCompleted = document.querySelector(".clear-completed")
// itemsLeft = document.querySelector(".items-left");
const input = document.querySelector('input')

//event listeners
// window.addEventListener("DOMContentLoaded", setupItems); does not work?? 
input.addEventListener("keypress", todoKeyHandler);
// clearCompleted.addEventListener("keypress", clearItems);

// dark theme - light theme
function changeTheme() {
	document.body.classList.toggle("light")
}
// have to use forEach because it is a nodeList

// technique i used before but not good anymore


let todos = []

// add a todo entry
function addEntry(entry) {
	const label = document.createElement("label");
	label.setAttribute("class", "list-item");
	label.setAttribute("draggable", "true");

	const cb = document.createElement("input");
	cb.setAttribute("class", "radio");
	cb.setAttribute("name", "input-check");
	cb.setAttribute("type", "checkbox");
	cb.addEventListener("change", () => { cb.parentElement.classList.toggle("crossed"); });

	const cbspan = document.createElement("span");
	cbspan.setAttribute("class", "checkmark");

	const deldiv = document.createElement("div");
	deldiv.setAttribute("class", "delete");

	const delbtn = document.createElement("button");
	delbtn.setAttribute("class", "delete-btn");
	delbtn.setAttribute("type", "button");
	delbtn.addEventListener("click", deleteItem);

	deldiv.appendChild(delbtn);
	label.appendChild(cb);
	label.appendChild(cbspan);
	label.appendChild(document.createTextNode(entry));
	label.appendChild(deldiv);

	document.getElementById("list").appendChild(label);
}

// handle enter key press on the todo list
function todoKeyHandler(e) {
	if (e.key !== "Enter")
		return;
	if (newTodo.value.length == 0) {
		alert.textContent = "Please enter value";
		setTimeout(function () {
			alert.textContent = "";
		}, 3000);
		return;
	}
	addEntry(e.target.value);
	newTodo.value = ''; // reset the new todo input to empty string 
}

// delete function 
function deleteItem (e) {
	e.target.parentNode.parentNode.remove() // this gets the parent element of the element you click, so; <div class="delete">. Then goes up one layer again to the <label> then removes the selected <label> Node with remove()
}

// you can assign a function to "onload" rather than listening for DOMContentLoaded:
onload = () => {
	addEntry("Complete online JavaScript course");
	addEntry("Jog around the park 3x");
	addEntry("10 minutes meditation");
	addEntry("Read for 1 hour");
	addEntry("Pick up groceries");
}

// items left number

function showItemsLeft () {
    const count = list.filter(todo => !todo.completed).length
    document.getElementById("items-left").innerHTML = count

    // const itemsLeft = Array.from(todos).filter((t) => t.checked === false).length
    // // have to use Array.from because it is a nodeList
    // console.log(itemsLeft)
    // document.getElementById("items-left").innerHTML = itemsLeft
}
showItemsLeft();

// console.log(document.getElementsByClassName("items-left"))

// i changed the "click" event listener to "change" because apparently there is some "Order of Execution" sillyness where in case of 'click' it would grab it before the checkbox change had gone through

