// scripts.js

document
  .getElementById("todoForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const todoInput = document.getElementById("todoInput");
    const todoText = todoInput.value.trim();

    if (todoText !== "") {
      const todoList = document.getElementById("todoList");
      const todoItem = document.createElement("li");
      todoItem.classList.add("todo-item");
      todoItem.innerHTML = `
          <span class="todo-text">${todoText}</span>
          <div class="action-buttons">
              <button class="edit-button"><i class="fas fa-edit"></i> Edit</button>
              <button class="delete-button"><i class="fas fa-trash"></i> Delete</button>
          </div>
      `;

      todoList.appendChild(todoItem);
      todoInput.value = "";

      // Add event listener for delete button
      todoItem
        .querySelector(".delete-button")
        .addEventListener("click", function () {
          todoList.removeChild(todoItem);
        });

      // Add event listener for edit button
      todoItem
        .querySelector(".edit-button")
        .addEventListener("click", function () {
          const todoTextElement = todoItem.querySelector(".todo-text");
          const currentText = todoTextElement.textContent;
          const newTextInput = document.createElement("input");
          newTextInput.type = "text";
          newTextInput.value = currentText;
          newTextInput.classList.add("todo-input");

          todoItem.replaceChild(newTextInput, todoTextElement);

          newTextInput.addEventListener("blur", function () {
            todoTextElement.textContent = newTextInput.value;
            todoItem.replaceChild(todoTextElement, newTextInput);
          });

          newTextInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
              todoTextElement.textContent = newTextInput.value;
              todoItem.replaceChild(todoTextElement, newTextInput);
            }
          });

          newTextInput.focus();
        });
    }
  });
