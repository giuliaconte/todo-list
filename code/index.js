// selecting items 
const alert = document.querySelector(".alert"),
  content = document.querySelector(".content"),
  checkbox = document.querySelectorAll("input[type=checkbox]"),
  newTodo = document.getElementById("new-todo"),
  filterAll = document.getElementById("all"),
  filterActive = document.getElementById("active"),
  filterCompleted = document.getElementById("completed"),
  clearCompleted = document.querySelector(".clear-completed");
const input = document.querySelector('input')
const itemsLeft = document.querySelector(".items-left")

let completedCount = 0;
let nonCompletedCount = 0;

// add a todo entry
function addEntry(entry) {

  console.log(entry)
	const listItem = document.createElement("div");
	listItem.classList.add("list-item");
  
	const label = document.createElement("label");
	label.setAttribute("draggable", "true");
  
	const cb = document.createElement("input");
	cb.setAttribute("class", "radio");
	cb.setAttribute("name", "input-check");
	cb.setAttribute("type", "checkbox");
	cb.addEventListener("change", () => {
	  cb.parentElement.classList.toggle("crossed");
	  updateCounts();
	});
  
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
    
    listItem.appendChild(label);
    document.getElementById("list").appendChild(listItem);

	nonCompletedCount++;
	updateCounts();
  }


// handle enter key press on the todo list
function todoKeyHandler(e) {
  console.log(e)
  if (e.key !== "Enter") return;
  if (newTodo.value.length === 0) {
    alert.textContent = "Please enter value";
    setTimeout(function () {
      alert.textContent = "";
    }, 3000);
    return;
  }
  addEntry(newTodo.value);
  newTodo.value = ''; // reset the new todo input to empty string 
}

input.addEventListener('keydown', function(e){
	todoKeyHandler(e)
  })


// delete function 
function deleteItem(e) {
  const parent = e.target.parentNode.parentNode;
  if (parent.querySelector('input[type=checkbox]').checked) {
    completedCount--;
  } else {
    nonCompletedCount--;
  }
  parent.remove();
  updateCounts(); // call updateCounts()
}


// update completed and non-completed counts
function updateCounts() {
  completedCount = document.querySelectorAll('input[type=checkbox]:checked').length;
  nonCompletedCount = document.querySelectorAll('input[type=checkbox]:not(:checked)').length;
  console.log(`Completed entries: ${completedCount}`);
  console.log(`Non-completed entries: ${nonCompletedCount}`);
	itemsLeft.textContent = nonCompletedCount
}



// you can assign a function to "onload" rather than listening for DOMContentLoaded:
onload = () => {
  addEntry("Complete online JavaScript course");
  addEntry("Jog around the park 3x");
  addEntry("10 minutes meditation");
  addEntry("Read for 1 hour");
  addEntry("Pick up groceries");
}

