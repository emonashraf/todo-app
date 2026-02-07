const todoList = JSON.parse(localStorage.getItem('todo-list')) ?? [];
const todoForm = document.querySelector('#todoForm');
const todoListElement = document.querySelector('#todoList');
let editingTodo = null;

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let title = todoForm.title.value;
  let priority = todoForm.priority.value;

  if (!title) {
    alert('Please enter a title');
    todoForm.title.focus();
    return;
  }

  if (!priority) {
    alert('Please select a priority');
    todoForm.priority.focus();
    return;
  }

  if (editingTodo) {
    updateTodo(title, priority);
  } else {
    addTodo(title, priority);
  }

  displayToDoList();
  todoForm.reset();
  editingTodo = null;
});

function addTodo(title, priority) {
  let now = Date.now();
  const newTodo = {
    id: now,
    title: title,
    priority: priority,
    completed: false,
  };
  todoList.push(newTodo);
  updateLocalStorage();
}

function updateTodo(title, priority) {
  editingTodo.title = title;
  editingTodo.priority = priority;
  updateLocalStorage();
}

function deleteTodo(id) {
  let indexToRemove =  todoList.findIndex((todo) => todo.id === id);
  
  if (indexToRemove >= 0) {
    todoList.splice(indexToRemove, 1);
    displayToDoList();
    updateLocalStorage();    
  }
}

function completeTodo(id) {
  let todo = findTodoById(id);
  todo.completed = true;
  updateLocalStorage();
  displayToDoList();
}

function updateLocalStorage() {
  localStorage.setItem('todo-list', JSON.stringify(todoList));
}

function displayToDoList() {
  if (todoList.length === 0) {
    todoListElement.innerHTML = '<p>No todo added yet</p>';
    return;
  }

  let list = `<ul class="list-group "> <li class="list-group-item d-flex justify-content-between align-items-center"> <h5>To-Do</h5> <h5>Priority</h5><h5>Action</h5></li>`;

  todoList.forEach((todo) => {
    console.log(todo.completed);
    
    list += `<li class="list-group-item d-flex justify-content-between align-items-center">
            <h6 ${todo.completed ? "class=text-decoration-line-through" : ''}>${todo.title}</h6>
            <h6>${todo.priority}</h6>
            <div class="d-flex flex-wrap gap-2">
                ${!todo.completed ? `<button class="btn btn-success completeBtn" data-id="${todo.id}">Done</button>` : ''}
                <button class="btn btn-primary editBtn" data-id="${todo.id}">Edit</button>
                <button class="btn btn-danger deleteBtn" data-id="${todo.id}">Delete</button>
            </div>
        </li>`;
  });

  list += '</ul>';
  todoListElement.innerHTML = list;
}
function findTodoById(id) {
  return todoList.find((todo) => todo.id === id);
}

function updateFormData(id) {
  editingTodo = findTodoById(id);
  todoForm.title.value = editingTodo.title;
  todoForm.priority.value = editingTodo.priority;
}

todoListElement.addEventListener('click', (e) => {
  if (e.target.classList.contains('editBtn')) {
    updateFormData(Number(e.target.dataset.id));
  }

  if (e.target.classList.contains('deleteBtn')) {
    deleteTodo(Number(e.target.dataset.id));
  }

  if (e.target.classList.contains('completeBtn')) {
    completeTodo(Number(e.target.dataset.id));
  }

});

function formatDate(timestamp) {
  const d = new Date(timestamp);
  const pad = (num) => String(num).padStart(2, '0');

  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

displayToDoList();
