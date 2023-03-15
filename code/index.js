//  selecting items
const alert = document.querySelector(".alert"),
content = document.querySelector(".content"),
checkbox = document.querySelectorAll("input[type=checkbox]"),
newTodo = document.getElementById("new-todo"),
filterAll = document.getElementById("all"),
filterActive = document.getElementById("active"),
filterCompleted = document.getElementById("completed");
const input = document.querySelector('input')
const itemsLeft = document.querySelector(".items-left")
let completedCount = 0;
let nonCompletedCount = 0;


// dark theme - light theme
function changeTheme() {
	document.body.classList.toggle("light")
}


// add a todo entry
function addEntry(entry) {
const listItem = document.createElement("div");
listItem.classList.add("list-item");
listItem.setAttribute("draggable", "true");
listItem.setAttribute("id", `item-${Date.now()}`);
const label = document.createElement("label");
label.setAttribute("draggable", "false"); // add this line to prevent the label from being draggable

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
//handled by updateCounts: nonCompletedCount++;
updateCounts();
//ditto: itemsLeft.textContent = `${nonCompletedCount} `; // add this line to update the itemsLeft count
// Add drag and drop functionality

listItem.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", e.target.id);
  e.target.classList.add("dragging");
});
listItem.addEventListener("dragend", (e) => {
  e.target.classList.remove("dragging");
});
listItem.addEventListener("dragover", (e) => {
  e.preventDefault();
  const afterElement = getDragAfterElement(listItem, e.clientY);
  const draggable = document.querySelector(".dragging");
  if (afterElement == null) {
    document.getElementById("list").appendChild(draggable);
  } else {
    document.getElementById("list").insertBefore(draggable, afterElement);
  }
});
}


function getDragAfterElement(listItem, y) {
const draggableElements = [...document.querySelectorAll(".list-item:not(.dragging)")];
return draggableElements.reduce(
  (closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  },
  { offset: Number.NEGATIVE_INFINITY } //smallest possible value in JavaScript, which is negative infinity. This value is often used in JavaScript to represent a value that is less than any other value, so setting offset to negative infinity indicates that there is no limit on how far the element can be dragged in one direction.
).element;
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
const parent = e.target.parentNode.parentNode.parentNode; // was missing a "parentNode"
/* this is handled by updateCounts()
if (parent.querySelector('input[type=checkbox]').checked) {
  completedCount--;
} else {
  nonCompletedCount--;
}*/
parent.remove();
updateCounts(); // call updateCounts()
}


// update completed and non-completed counts, filtering
function updateCounts(filter) {
let count = 0;
completedCount = 0;
nonCompletedCount = 0;
const listItems = document.querySelectorAll(".list-item");
listItems.forEach((item) => {
  const checkbox = item.querySelector(".radio");
  const isChecked = checkbox.checked;
  if (filter === "completed" && !isChecked) {
    item.style.display = "none";
  } else if (filter === "active" && isChecked) {
    item.style.display = "none";
  } else {
    item.style.display = "flex";
    count++;
    if (isChecked) {
      completedCount++;
    } else {
      nonCompletedCount++;
    }
    itemsLeft.textContent = `${nonCompletedCount} `;
  }
});
}
// This code block is a conditional statement that checks the value of the filter variable and the isChecked property of a certain item. Based on these values, the code will change the display style property of the item.
// if (filter === "completed" && !isChecked): This checks if the filter variable is equal to "completed" and the isChecked property is false. If both conditions are true, it sets the display style property of the item to "none". This means that the item will be hidden from view.
// else if (filter === "active" && isChecked): This checks if the filter variable is equal to "active" and the isChecked property is true. If both conditions are true, it sets the display style property of the item to "none". This means that the item will be hidden from view.
// else: If neither of the above conditions is true, it sets the display style property of the item to "flex". This means that the item will be displayed as a flex container. Additionally, it increments the count variable.


function clearCompleted() {
const completedItems = document.querySelectorAll('.list-item input[type=checkbox]:checked');
completedItems.forEach(item => item.parentNode.parentNode.remove());
// handled by updateCounts: completedCount = 0;
updateCounts();
}
// can assign a function to "onload" rather than listening for DOMContentLoaded:
onload = () => {
addEntry("Complete online JavaScript course");
addEntry("Jog around the park 3x");
addEntry("10 minutes meditation");
addEntry("Read for 1 hour");
addEntry("Pick up groceries");
}