function changeTheme() {
    document.body.classList.toggle("light")
}

function addItem() { //We call this function on the circle class on the HTML, so that when the circle is clicked this happens

    const text = document.getElementById("newTodo").value //first we need to isolate the text we will add in to new list item. To do this, we are grabbing the value of the input box next to it, which has the Id of "newTodo"

    const list = document.getElementById("list").innerHTML += 
    //Then we are grabbing the entire list we need to add the new list item to. The list has the Id of "list"
    //in the same line ( though I put it on the next line here so I can comment on it seperately) we are saying ADD ( += ) the following to the innerHTML. By adding to the innerHTML specifically, you can tell it that you want to add HTML code, rather than just text. 
    `
    <label class="list-item" id="listItem">
    <input type="checkbox" name="list-item" class="radio"> <span class="checkmark"> </span>
    ${text}
    </label>
    `
}


