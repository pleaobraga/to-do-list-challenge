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

function getTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    let li = document.createElement("li");
    let span = document.createElement("span");

    let inputText = document.createTextNode(task.element);

    span.appendChild(inputText);
    li.appendChild(span);

    closeButton(li);

    if (task.isChecked) {
      li.classList.add("checked");
      span.classList.add("checked");
      listCompleted.appendChild(li);
    } else {
      list.appendChild(li);
    }

    li.setAttribute("id", task.id);
  });
}

getTasks();

function addTask() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  let input = document.querySelector("#task");
  let inputValue = input.value;

  if (inputValue.trim() === "") {
    return;
  }

  let li = document.createElement("li");
  let span = document.createElement("span");

  let inputText = document.createTextNode(inputValue);

  span.appendChild(inputText);
  li.appendChild(span);

  list.appendChild(li);
  inputValue = "";

  if (tasks == 0) {
    li.setAttribute("id", 1);
  } else {
    li.setAttribute("id", tasks[tasks.length - 1].id + 1);
  }

  closeButton(li);

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

function closeButton(li) {
  let button = document.createElement("button");
  let buttonText = document.createTextNode("Remover");

  button.appendChild(buttonText);
  li.appendChild(button);

  button.addEventListener("click", (event) => {
    const id = event.target.parentElement.getAttribute("id");

    if (event.target.parentElement.classList.contains("checked")) {
      removeTaskCompleted(Number(id));
    } else {
      removeTask(Number(id));
    }
  });
}

function removeTask(id) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const taskFiltered = tasks.filter((task) => {
    return task.id !== id;
  });

  localStorage.setItem("tasks", JSON.stringify(taskFiltered));

  const getId = document.getElementById(id);

  list.removeChild(getId);
}

function removeTaskCompleted(id) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const taskFiltered = tasks.filter((task) => {
    return task.id !== id;
  });

  localStorage.setItem("tasks", JSON.stringify(taskFiltered));

  const getId = document.getElementById(id);

  listCompleted.removeChild(getId);
}

list.addEventListener("click", (event) => {
  setIsChecked(event);
});

listCompleted.addEventListener("click", (event) => {
  setIsNotChecked(event);
});

function setIsChecked(event) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const id = event.target.getAttribute("id");

  for (let task of tasks) {
    if (task.id == id) {
      task.isChecked = true;
    }
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));

  if (event.target.tagName === "LI") {
    taskCompleted(event);
  }
}

function setIsNotChecked(event) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const id = event.target.getAttribute("id");

  for (let task of tasks) {
    if (task.id == id) {
      task.isChecked = false;
    }
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));

  if (event.target.tagName === "LI") {
    taskIncompleted(event);
  }
}

function taskCompleted(event) {
  const id = event.target.getAttribute("id");

  let li = document.createElement("li");
  let span = document.createElement("span");

  let inputText = document.createTextNode(event.target.firstChild.textContent);

  span.appendChild(inputText);
  li.appendChild(span);

  li.setAttribute("id", id);

  const getId = document.getElementById(id);

  list.removeChild(getId);

  listCompleted.appendChild(li);

  closeButton(li);

  li.classList.add("checked");
  span.classList.add("checked");
}

function taskIncompleted(event) {
  const id = event.target.getAttribute("id");

  let li = document.createElement("li");
  let span = document.createElement("span");

  let inputText = document.createTextNode(event.target.firstChild.textContent);

  span.appendChild(inputText);
  li.appendChild(span);

  li.setAttribute("id", id);

  const getId = document.getElementById(id);

  listCompleted.removeChild(getId);

  list.appendChild(li);

  closeButton(li);

  li.classList.remove("checked");
  span.classList.remove("checked");
}
