const add = document.querySelector("#add");
const list = document.querySelector("ul");
const inputAdd = document.querySelector(".form");

add.addEventListener("click", () => {
  setTimeout(addTask, 2000);
});

inputAdd.addEventListener("submit", (event) => {
  event.preventDefault();
  setTimeout(addTask, 2000);
});

function getTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((element) => {
    let li = document.createElement("li");
    let span = document.createElement("span");

    let inputText = document.createTextNode(element.element);

    span.appendChild(inputText);
    li.appendChild(span);

    list.appendChild(li);

    closeButton(li);

    if(element.isChecked) {
      li.classList.add("checked")
    }
    
    li.setAttribute("id", element.id);
  });
}

getTasks()

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

    removeTask(Number(id));
  });
}

function removeTask(id) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const taskFiltered = tasks.filter((task) => {
    return task.id !== id;
  });

  localStorage.setItem("tasks", JSON.stringify(taskFiltered));

  const getId = document.getElementById(id)

  list.removeChild(getId)
}

list.addEventListener("click", (event) => {
  setIsChecked(event)
});

function setIsChecked(event) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const id = event.target.getAttribute("id")

  for(let task of tasks) {
    if (task.id == id) {
      task.isChecked = !task.isChecked
    } 
  }

  if (event.target.tagName === "LI") {
    event.target.classList.toggle("checked");
  }
  if (event.target.tagName === "SPAN") {
    event.target.parentElement.classList.toggle("checked");
  }
  
  localStorage.setItem("tasks", JSON.stringify(tasks))
}
