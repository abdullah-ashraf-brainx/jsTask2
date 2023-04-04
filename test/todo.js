const list = document.getElementById("list");
const newTodoInput = document.getElementById("new-todo");
const addTodoButton = document.getElementById("add-todo");

let todos = [];

function renderTodos() {
	// Clear the existing list
	list.innerHTML = "";

	// Render each todo item
	todos.forEach((todo, index) => {
		const listItem = document.createElement("li");
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.checked = todo.done;
		checkbox.addEventListener("click", () => {
			todos[index].done = !todos[index].done;
			renderTodos();
		});
		const textContainer = document.createElement("div");
		if (todo.editing) {
			const textInput = document.createElement("input");
			textInput.type = "text";
			textInput.value = todo.text;
			textInput.addEventListener("input", () => {
				todos[index].text = textInput.value;
			});
			textInput.addEventListener("keydown", (event) => {
				if (event.key === "Enter") {
					todos[index].editing = false;
					renderTodos();
				}
			});
			textInput.addEventListener("blur", () => {
				todos[index].editing = false;
				renderTodos();
			});
			textContainer.appendChild(textInput);
		} else {
			const text = document.createElement("span");
			text.textContent = todo.text;
			text.addEventListener("click", () => {
				todos[index].editing = true;
				renderTodos();
			});
			if (todo.done) {
				text.classList.add("done");
			}
			textContainer.appendChild(text);
		}
		const deleteButton = document.createElement("button");
		deleteButton.textContent = "Delete";
		deleteButton.addEventListener("click", () => {
			todos.splice(index, 1);
			renderTodos();
		});
		listItem.appendChild(checkbox);
		listItem.appendChild(textContainer);
		listItem.appendChild(deleteButton);
		list.appendChild(listItem);
	});
}

addTodoButton.addEventListener("click", () => {
	const newTodoText = newTodoInput.value.trim();
	if (newTodoText !== "") {
		todos.push({
			text: newTodoText,
			done: false,
			editing: false
		});
		newTodoInput.value = "";
		renderTodos();
	}
});

renderTodos();
