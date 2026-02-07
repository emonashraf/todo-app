const todoList = [];
let editingId = 2;

// create
addTodo({ id: 1, title: 'Home page update', priority: 'high' });
displayTodo();

addTodo({ id: 2, title: 'About page update', priority: 'medium' });
displayTodo();

addTodo({ id: 3, title: 'Contact page update', priority: 'low' });
displayTodo();

function addTodo(newTodo) {
  todoList.push(newTodo);
}


function displayTodo() {
  todoList.forEach((todo) => console.log(`${todo.title} - ${todo.priority}`));
  console.log('-------------------');
}


// Update
function updateTodo(id) {
    let editingTodo = todoList.find((todo) => todo.id === id);
    editingTodo.title = 'Contact page updatedddddddd';
    editingTodo.priority = 'medium';
}

updateTodo(editingId);


displayTodo();


let filtered = todoList.filter((todo) => todo.id !==2);
console.log(filtered);
