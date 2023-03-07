// selecting items 
const alert = document.querySelector(".alert"),
	list = document.querySelector(".list"),
	content = document.querySelector(".content"),
	checkbox = document.querySelectorAll("input[type=checkbox]"),
	newTodo = document.getElementById("new-todo"),
	filterAll = document.getElementById("all"),
	filterActive = document.getElementById("active"),
	filterCompleted = document.getElementById("completed"),
	clearCompleted = document.querySelector(".clear-completed");
const input = document.querySelector('input')

//event listeners
input.addEventListener("keypress", todoKeyHandler);
// clearCompleted.addEventListener("keypress", clearItems);

// dark theme - light theme
function changeTheme() {
	document.body.classList.toggle("light")
}
// have to use forEach because it is a nodeList


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

function countEntries() {
	const entryLabels = document.querySelectorAll('.list-item');
	return entryLabels.length;
  }

  const numEntries = countEntries();
console.log(`Number of entries: ${numEntries}`);

  

// function showItemsLeft () {
//     const count = list.filter(label => !label.crossed).length
//     document.getElementById("items-left").innerHTML = count
// 	console.log(count)
// }
// showItemsLeft()

//     const itemsLeft = Array.from(todos).filter((t) => t.checked === false).length
//     // // have to use Array.from because it is a nodeList
//     // console.log(itemsLeft)
//     // document.getElementById("items-left").innerHTML = itemsLeft
// }
// showItemsLeft();

// function filterTodo(e) {
// 	const entries = list.childNodes;
// 	for(let i = 1; i<entries.length; i++ ){
// 	switch (e.target.value) {
// 	case "all":
// 	entries[i].style.display = "flex";
// 	break;
// 	case "completed":
// 	if (entries[i].classList.contains('crossed')) {
// 	entries[i].style.display = "flex";
// 	} else {
// 	entries[i].style.display = "none";
// 	}
// 	break;
// 	case "uncompleted":
// 	if (!entries[i].classList.contains('crossed')) {
// 	entries[i].style.display = "flex";
// 	} else {
// 	entries[i].style.display = "none";
// 	}
// 	break;
// 	}}}