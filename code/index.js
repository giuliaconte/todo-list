// selecting items 
const alert = document.querySelector(".alert"),
    list = document.querySelector(".list"),
    listItem = document.getElementById("listItem"),
    content = document.querySelector(".content"),
    checkmark = document.querySelectorAll(".checkmark"),
    newTodo = document.getElementById("new-todo"),
    input = document.querySelector('input'),
    filterAll = document.getElementById("all"),
    filterActive = document.getElementById("active"),
    filterCompleted = document.getElementById("completed"),
    clearCompleted = document.querySelector(".clear-completed");

//event listeners
// window.addEventListener("DOMContentLoaded", setupItems); does not work?? 
input.addEventListener("keypress", addItem);
// clearCompleted.addEventListener("keypress", clearItems);

// dark theme - light theme
function changeTheme() {
document.body.classList.toggle("light")
}

// technique i used before but not good anymore
// function addItem() { 
//i call this function on the circle class on the HTML, so that when the circle is clicked this happens

// const text = document.getElementById("newTodo").value //first i need to isolate the text we will add in to new list item

//     const list = document.getElementById("list").innerHTML += 

//     Then i am grabbing the entire list we need to add the new list item to. 
//     in the same line ( though I put it on the next line here so I can comment on it seperately) we are saying ADD ( += ) the following to the innerHTML. By adding to the innerHTML specifically, you can tell it that you want to add HTML code, rather than just text. 
//     `
//     <label class="list-item" id="listItem">
//     <input type="checkbox" name="list-item" class="radio"> <span class="checkmark"> </span>
//     ${text}
//     </label>
//     `
// }



// add new item to the list
function addItem(e) {

if (newTodo.value.length == 0 && e.key === "Enter") {
    alert.textContent = "Please enter value";
    setTimeout(function () {
        alert.textContent = "";
        }, 3000);
} else if (e.key === "Enter"){
    document.getElementById("list").innerHTML += 
    `
    <label class="list-item" id="listItem" draggable="true">
    <input type="checkbox" name="list-item" class="radio"> <span class="checkmark"> </span>
    ${e.target.value}
    <div class="delete"><button type="button" class="delete-btn"></button></div>
    </label>
    `
    newTodo.value = ''; // reset the new todo input to empty string 
    newTodo.setAttribute('class', "delete")
}}

// delete button
const deleteBtns = document.getElementsByClassName("delete") // This gets all the elements with the "delete" class and stores it into an 'HTMLCollection'
console.log(deleteBtns);

Array.from(deleteBtns).forEach(function(element) { // This first creates an array from the HTMLCollection so i can use methods on it, loops over the array and says "For Each element in this array, add a 'click' eventListener" to make sure that all the delete buttons have it
    element.addEventListener('click', deleteItem);
  });

function deleteItem (e) {
    console.log("ehfcjkeshf")
    e.target.parentNode.parentNode.remove() // this gets the parent element of the element you click, so; <div class="delete">. Then goes up one layer again to the <label> then removes the selected <label> Node with remove()
}