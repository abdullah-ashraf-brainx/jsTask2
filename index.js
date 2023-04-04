const myTextBox = document.getElementById('new-item');

myTextBox.addEventListener('keypress', function (e) {
    if (e.code === "Enter") {
        addItem();
    }
});

let todoList = [];

function addItem() {
    const newItem = document.getElementById("new-item").value;
    if (newItem !== "") {
        todoList.push(newItem);
        renderList();
        document.getElementById("new-item").value = "";
    }
}

function deleteItem(index) {
    todoList.splice(index, 1);
    renderList();
}

function updateItem(index) {
    // const newValue = prompt("Enter new value:");
    // if (newValue !== null && newValue !== "") {
    todoList[index] = "toUpdate";
    renderList();
    // }
}

function renderList() {
    const list = document.getElementById("todo-list");
    list.innerHTML = "";
    console.log(todoList);
    for (let i = 0; i < todoList.length; i++) {
        const item = document.createElement("li");
        if (todoList[i] !== "toUpdate") {

            // Todo Text
            const todoText = document.createElement("span");
            todoText.innerText = todoList[i];
            todoText.style.marginLeft = '10px';

            // Checkbox
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox"
            checkbox.style.float = 'left';
            checkbox.marginRight = '10px';
            checkbox.style.position = 'relative';
            checkbox.style.top = '5px';

            // Delete Button
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Delete";
            deleteBtn.classList.add("btn");
            deleteBtn.classList.add("btn-danger");
            deleteBtn.style.float = 'right';
            deleteBtn.onclick = function () {
                deleteItem(i);
            };

            // Update Button
            const updateBtn = document.createElement("button");
            updateBtn.innerText = "Edit";
            updateBtn.classList.add("btn");
            updateBtn.classList.add("btn-primary");
            updateBtn.style.marginRight = '10px';
            updateBtn.style.float = 'right';
            updateBtn.onclick = function () {
                updateItem(i);
            };

            item.appendChild(checkbox);
            item.appendChild(todoText);
            item.appendChild(deleteBtn);
            item.appendChild(updateBtn);
            list.appendChild(item);
        }
        else {
            // TextBox
            const textBox = document.createElement("input");
            textBox.type = "text"
            textBox.setAttribute('id', 'newBox');
            textBox.style.float = 'left';

            // Delete Button
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Delete";
            deleteBtn.classList.add("btn");
            deleteBtn.classList.add("btn-danger");
            deleteBtn.style.float = 'right';
            deleteBtn.onclick = function () {
                deleteItem(i);
            };

            // Update Button
            const updateBtn = document.createElement("button");
            updateBtn.innerText = "Save";
            updateBtn.classList.add("btn");
            updateBtn.classList.add("btn-primary");
            updateBtn.style.marginRight = '10px';
            updateBtn.style.float = 'right';
            updateBtn.onclick = function () {
                const newItem = document.getElementById('newBox');
                console.log(newItem);
                todoList[i] = newItem.value;
                renderList();
            };

            item.appendChild(textBox);
            item.appendChild(deleteBtn);
            item.appendChild(updateBtn);
            list.appendChild(item);
        }
    }
}

renderList();
