const add = document.querySelector("#add");
const list = document.querySelector(".myWorks");
const inputAdd = document.querySelector(".form");
const listCompleted = document.querySelector(".myWorksCompleted");

add.addEventListener("click", () => {
  setTimeout(addTask, 2000);
});

inputAdd.addEventListener("submit", (event) => {
  event.preventDefault();
  setTimeout(addTask, 2000);
});

function createTask(task, id) {
  let li = document.createElement("li");
  let span = document.createElement("span");

  let inputText = document.createTextNode(task);

  span.appendChild(inputText);
  li.appendChild(span);

  li.setAttribute("id", id);

  createRemoveTaskButton(li);

  return { li, span };
}

function getTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    const { li, span } = createTask(task.element, task.id);

    if (task.isChecked) {
      li.classList.add("checked");
      span.classList.add("checked");
      listCompleted.appendChild(li);
      return
    }

    list.appendChild(li);
  });
}

getTasks();

function addTask() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  let id = 1;

  if (tasks != 0) {
    id = tasks[tasks.length - 1].id + 1;
  }

  let input = document.querySelector("#task");
  let inputValue = input.value;

  if (inputValue.trim() === "") {
    return;
  }

  const { li } = createTask(inputValue, id);
  inputValue = "";

  list.appendChild(li);

  saveLocal(input.value);

  inputAdd.reset();
}

function saveLocal(value) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const task = {};

  if (tasks.length === 0) {
    task.id = 1;
    task.element = value;
    task.isChecked = false;
  } else {
    task.id = tasks[tasks.length - 1].id + 1;
    task.element = value;
    task.isChecked = false;
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createRemoveTaskButton(li) {
  let button = document.createElement("button");
  let buttonText = document.createTextNode("Remover");

  button.appendChild(buttonText);
  li.appendChild(button);

  button.addEventListener("click", (event) => {
    const id = event.target.parentElement.getAttribute("id");

    removeTask(Number(id), event);
  });
}

function removeTask(id, event) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const getId = document.getElementById(id);

  const taskFiltered = tasks.filter((task) => {
    return task.id !== id;
  });

  localStorage.setItem("tasks", JSON.stringify(taskFiltered));

  if (event.target.parentElement.classList.contains("checked")) {
    listCompleted.removeChild(getId);
    return;
  }
  list.removeChild(getId);
}

list.addEventListener("click", (event) => {
  setIsChecked(event);
});

listCompleted.addEventListener("click", (event) => {
  setIsChecked(event);
});

function setIsChecked(event) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const id = event.target.getAttribute("id");

  for (let task of tasks) {
    if (task.id == id) {
      task.isChecked = !task.isChecked;
    }
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));

  if (event.target.tagName === "LI") {
    changeIsCheckedState(event);
  }
}

function changeIsCheckedState(event) {
  const id = event.target.getAttribute("id");

  const { li, span } = createTask(event.target.firstChild.textContent, id);

  const getId = document.getElementById(id);

  if (event.target.classList.contains("checked")) {
    listCompleted.removeChild(getId);

    list.appendChild(li);

    li.classList.remove("checked");
    span.classList.remove("checked");
    return;
  }

  list.removeChild(getId);

  listCompleted.appendChild(li);

  li.classList.add("checked");
  span.classList.add("checked");
}