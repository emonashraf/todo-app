const todoList = [];
const todoForm = document.querySelector('#todoForm');
const todoListElement = document.querySelector('#todoList');

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!todoForm.title.value) {
    alert('Please enter a title');
    todoForm.title.focus();
    return;
  }

  if (!todoForm.priority.value) {
    alert('Please select a priority');
    todoForm.priority.focus();
    return;
  }

  let now = Date.now();
  const newTodo = {
    id: now,
    title: todoForm.title.value,
    priority: todoForm.priority.value,
  };

  addTodo(newTodo);
  displayToDoList();
  todoForm.reset();
});

function addTodo(todo) {
  todoList.push(todo);
}

function displayToDoList() {
  if (todoList.length === 0) {
    todoListElement.innerHTML = '<p>No todo added yet</p>';
    return;
  }

  let list = `<ul class="list-group "> <li class="list-group-item d-flex justify-content-between align-items-center"> <h5>To-Do</h5> <h5>Priority</h5><h5>Action</h5></li>`;

  todoList.forEach((todo) => {
    list += `<li class="list-group-item d-flex justify-content-between align-items-center">
            <h6>${todo.title}</h6>
            <h6>${todo.priority}</h6>
            <div class="d-flex flex-wrap gap-2">
                <button class="btn btn-success">Done</button>
                <button class="btn btn-primary editBtn" data-id="${todo.id}">Edit</button>
                <button class="btn btn-danger">Delete</button>
            </div>
        </li>`;
  });

  list += '</ul>';

  todoListElement.innerHTML = list;
}

function formatDate(timestamp) {
  const d = new Date(timestamp);
  const pad = (num) => String(num).padStart(2, '0');

  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

displayToDoList();
// Edit todo
