import data from '/data.json'  assert { type: 'json' };

console.log(data);

const inputField = document.querySelector('#todoInput');
const addButton = document.querySelector('#addButton');
const toDoListElement = document.querySelector('#toDoList');
const completedListElement = document.querySelector('#completedList');
// const toDoList = JSON.parse(localStorage.getItem('todoList')) ?? [];
// const completedList = JSON.parse(localStorage.getItem('completedList')) ?? [];
const {toDoList, completedList} = data;


const handleDoneButtonClick = function () {
    let doneItem = this.parentNode.parentNode.querySelector('h5').innerText;
    let indexOfDoneItem = toDoList.indexOf(doneItem);
    toDoList.splice(indexOfDoneItem, 1);
    completedList.push(doneItem);
    this.parentNode.parentNode.remove();
    localStorage.setItem('todoList', JSON.stringify(toDoList));
    localStorage.setItem('completedList', JSON.stringify(completedList));
    renderCompletedList();
}

const handleRestoreButtonClick = function () {
    let restoreItem = this.parentNode.querySelector('h5').innerText;
    let indexOfRestoreItem = toDoList.indexOf(restoreItem);
    completedList.splice(indexOfRestoreItem, 1);
    toDoList.unshift(restoreItem);
    this.parentNode.remove();
    localStorage.setItem('todoList', JSON.stringify(toDoList));
    localStorage.setItem('completedList', JSON.stringify(completedList));
    renderToDoList();
}

const handleDeleteButtonClick = function () {

    var result = confirm("Are you sure to delete this to-do item?");
    if (!result) {
        return;
    }

    let deleteItem = this.parentNode.parentNode.querySelector('h5').innerText;
    let indexOfDeleteItem = toDoList.indexOf(deleteItem);

    toDoList.splice(indexOfDeleteItem, 1);
    this.parentNode.parentNode.remove();
    localStorage.setItem('todoList', JSON.stringify(toDoList));
}

const createNewTodo = (todoText) => {
    let todoItem = document.createElement('li');
    todoItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

    let todo = document.createElement('h5');
    todo.innerHTML = todoText;
    todoItem.appendChild(todo);

    let buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('d-flex', 'flex-wrap', 'gap-2');
    todoItem.appendChild(buttonWrapper);

    let doneButton = document.createElement('button');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.type = 'button';
    doneButton.innerText = 'Done';

    doneButton.addEventListener('click', handleDoneButtonClick);
    buttonWrapper.appendChild(doneButton);

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.type = 'button';
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', handleDeleteButtonClick);

    buttonWrapper.appendChild(deleteButton);
    return todoItem;
}

const createNewcompletedList = (completedList) => {
    let completedItem = document.createElement('li');
    completedItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    let completed = document.createElement('h5');
    completed.innerHTML = completedList;
    completedItem.appendChild(completed);

    let restoreButton = document.createElement('button');
    restoreButton.classList.add('btn', 'btn-warning');
    restoreButton.type = 'button';
    restoreButton.innerText = 'Undone';

    restoreButton.addEventListener('click', handleRestoreButtonClick);

    completedItem.appendChild(restoreButton);

    return completedItem;
}

const renderToDoList = () => {
    let myList = document.createElement('ul');
    myList.classList.add('list-group');

    toDoListElement.innerHTML = '';
    myList.innerHTML = '';

    toDoList.map((todo) => {
        let item = createNewTodo(todo);
        myList.appendChild(item);
    });

    toDoListElement.appendChild(myList);
}

const renderCompletedList = () => {
    let myList = document.createElement('ul');
    myList.classList.add('list-group');

    completedListElement.innerHTML = '';
    myList.innerHTML = '';

    completedList.map((task) => {
        let item = createNewcompletedList(task);
        myList.appendChild(item);
    });

    completedListElement.appendChild(myList);
}

renderToDoList();
renderCompletedList();

const toDoSubmitHandler = () => {
    const newTodo = inputField.value.trim();

    if (!newTodo) {
        alert('To-do item is required');
        return;
    }

    if (toDoList.includes(newTodo) || completedList.includes(newTodo)) {
        alert(newTodo + ' is already exists');
        return;
    }

    toDoList.unshift(newTodo);
    inputField.value = '';
    localStorage.setItem('todoList', JSON.stringify(toDoList));
    renderToDoList();
    saveTasksToFile();
}

addButton.addEventListener('click', toDoSubmitHandler);

inputField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        toDoSubmitHandler();
    }
});

function createContainer(){
    
}

