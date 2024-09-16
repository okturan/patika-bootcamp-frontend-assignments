// script.js

document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addButton = document.getElementById("add-button");
  const todoList = document.getElementById("todo-list");
  const toastElement = document.getElementById("notification-toast");
  const toastBody = document.getElementById("toast-body");
  const toast = new bootstrap.Toast(toastElement);

  let todos = [];

  // Load todos from Local Storage
  loadTodos();

  // Event listener for adding a new todo
  addButton.addEventListener("click", () => {
    const task = todoInput.value.trim();
    if (task === "") {
      showToast("Please enter a valid task.", "danger");
      return;
    }
    addTodo(task);
    todoInput.value = "";
    showToast("Task added successfully!", "success");
  });

  // Function to render a todo item
  function renderTodo(todo) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.setAttribute("data-id", todo.id);

    const span = document.createElement("span");
    span.textContent = todo.task;
    if (todo.completed) {
      span.classList.add("completed");
    }

    const div = document.createElement("div");

    const completeButton = document.createElement("button");
    completeButton.className = "btn btn-success btn-sm me-2";
    completeButton.textContent = "Done";
    completeButton.addEventListener("click", () => toggleComplete(todo.id));

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTodo(todo.id));

    div.appendChild(completeButton);
    div.appendChild(deleteButton);

    li.appendChild(span);
    li.appendChild(div);

    todoList.appendChild(li);
  }

  // Function to add a todo
  function addTodo(task) {
    const todo = {
      id: Date.now(),
      task: task,
      completed: false,
    };
    todos.push(todo);
    saveTodos();
    renderTodo(todo);
  }

  // Function to delete a todo
  function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    saveTodos();
    const li = document.querySelector(`li[data-id='${id}']`);
    if (li) {
      todoList.removeChild(li);
    }
    showToast("Task deleted successfully!", "warning");
  }

  // Function to toggle completion status
  function toggleComplete(id) {
    todos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        console.log(`Toggling task "${todo.task}" to ${todo.completed ? "completed" : "not completed"}`);
      }
      return todo;
    });
    saveTodos();
    const span = document.querySelector(`li[data-id='${id}'] span`);
    if (span) {
      span.classList.toggle("completed");
      console.log(`Applied 'completed' class: ${span.classList.contains("completed")}`);
    }
    showToast("Task status updated!", "info");
  }

  // Function to show toast notifications
  function showToast(message, type) {
    toastBody.textContent = message;
    toastElement.className = `toast align-items-center text-bg-${type} border-0`;
    toast.show();
  }

  // Function to save todos to Local Storage
  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // Function to load todos from Local Storage
  function loadTodos() {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      todos = JSON.parse(storedTodos);
      todos.forEach((todo) => renderTodo(todo));
    }
  }
});
