const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
const TODOS_KEY = "toDos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function checkToDo(check) {
  let li = check.target.previousElementSibling;
  li.classList.toggle("done");
}

function deleteToDo(event) {
  let li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
  let li = document.createElement("li");
  let span = document.createElement("span");
  let checkBtn = document.createElement("button");
  let delBtn = document.createElement("button");

  li.id = newTodo.id;
  span.innerText = newTodo.text;

  checkBtn.setAttribute("class", "xi-check");
  checkBtn.addEventListener("click", checkToDo);
  delBtn.setAttribute("class", "xi-close");
  delBtn.addEventListener("click", deleteToDo);

  li.appendChild(span);
  li.appendChild(checkBtn);
  li.appendChild(delBtn);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  let newTodo = toDoInput.value;
  let newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDoInput.value = "";

  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos != null) {
  toDos = JSON.parse(localStorage.getItem(TODOS_KEY));
  toDos.forEach(paintToDo);
}