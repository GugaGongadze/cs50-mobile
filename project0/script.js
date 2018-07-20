const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete'
};

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

function newTodo() {
  const todoText = document.createTextNode(prompt('What do you want to do?'));

  if (todoText.length) {
    const todoSpan = document.createElement('span');
    todoSpan.appendChild(todoText);
    todoSpan.classList.add('todo-text');

    const todoCheckbox = document.createElement('input');
    todoCheckbox.classList.add('todo-checkbox');
    todoCheckbox.setAttribute('type', 'checkbox');
    todoCheckbox.addEventListener('change', onCheckboxToggle);

    const todoDeleteButton = document.createElement('button');
    todoDeleteButton.classList.add('todo-delete');
    todoDeleteButton.innerText = '❌';
    todoDeleteButton.addEventListener('click', onTodoDelete);

    const todoLi = document.createElement('li');
    todoLi.classList.add('todo-container');
    todoLi.appendChild(todoCheckbox);
    todoLi.appendChild(todoSpan);
    todoLi.appendChild(todoDeleteButton);

    list.appendChild(todoLi);

    const numberOfTodos = document.querySelectorAll('.todo-container');
    itemCountSpan.innerHTML = numberOfTodos.length;
  }
}

function onCheckboxToggle(e) {
  if (e.target.checked) {
    uncheckedCountSpan.innerHTML = String(
      Number(uncheckedCountSpan.innerHTML) + 1
    );
  } else {
    uncheckedCountSpan.innerHTML = String(
      Number(uncheckedCountSpan.innerHTML) - 1
    );
  }
}

function onTodoDelete(e) {
  e.target.parentNode.remove();

  const numberOfTodos = document.querySelectorAll('.todo-container');
  itemCountSpan.innerHTML = numberOfTodos.length;

  if (e.target.previousElementSibling.previousElementSibling.checked) {
    uncheckedCountSpan.innerHTML = String(
      Number(uncheckedCountSpan.innerHTML) - 1
    );
  }
}
