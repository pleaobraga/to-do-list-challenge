let allTasks = [];
let countTasks = 0;
let removeTaskBtn = null;
const createTaskBtn = document.querySelector("#createTask");
const createTaskText = document.querySelector("#newTask");
const listTasks = document.querySelector("ul");
const inputTheme = document.querySelector("#theme-btn");
const bodyPage = document.querySelector("body");
const listBtnFilter = document.querySelectorAll(".list-btn");
const btnFilterAll = document.querySelector("#filter-btn-all");
const btnFilterDone = document.querySelector("#filter-btn-done");
const btnFilterTodo = document.querySelector("#filter-btn-todo");
const removeBtnHtml = `
<button type="submit" class="remove-btn">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>
</button>
`;

// Get day and insert on screen
function insertDay() {
  const day = new Date();
  const dayOptions = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  let dayString = day.toLocaleDateString("pt-br", dayOptions);
  dayString = dayString.replace(
    dayString.charAt(0),
    dayString.charAt(0).toUpperCase()
  );
  const dayOutput = document.querySelector(".date");
  dayOutput.insertAdjacentText("afterbegin", dayString);
}
insertDay();

// Get localStorage data
function loadStorage() {
  // search data in localStorage
  allTasks = JSON.parse(localStorage.getItem("allTasks"));

  // check if data is null
  if (allTasks !== null) {
    allTasks.map((item) => {
      if (item.taskText) {
        item.taskDone
          ? listTasks.insertAdjacentElement("beforeend", insertLi(item))
          : listTasks.insertAdjacentElement("afterbegin", insertLi(item));
      } else {
        allTasks.shift();
      }
    });

    localStorage.setItem("allTasks", JSON.stringify(allTasks));
    listenRemoveBtn();
  } else {
    allTasks = [{}];
  }
}
loadStorage();

// **** Event listeners ****
// Listen Btn createTask
createTaskBtn.addEventListener("click", createTask);

// Listen Btn removeTask
function listenRemoveBtn() {
  removeTaskBtn = document.querySelectorAll(".remove-btn");
  removeTaskBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const clicked = e.path;
      const liClicked = clicked.find((item) => item.localName === "li");
      const taskToRemove = liClicked.firstChild.innerText;

      // remove from screen
      listTasks.removeChild(liClicked);

      // remove from LocalStorage
      allTasks = JSON.parse(localStorage.getItem("allTasks"));
      const index = allTasks.findIndex(
        (task) => task.taskText === taskToRemove
      );
      allTasks.splice(index, 1);
      localStorage.setItem("allTasks", JSON.stringify(allTasks));
      listenRemoveBtn();
    });
  });
}

// Listen input key Enter
createTaskText.addEventListener("keydown", (e) =>
  e.keyCode === 13 ? createTask(e) : null
);

// Change theme
inputTheme.addEventListener("click", (e) => changeTheme(e));
const changeTheme = (e) => {
  bodyPage.classList.toggle("dark-theme");
  inputTheme.classList.toggle("theme-btn-dark");
};

// Filter Todo tasks
btnFilterTodo.addEventListener("click", (e) => {
  const listLi = listTasks.querySelectorAll("li");
  listLi.forEach((item) => {
    item.firstChild.classList.contains("done")
      ? item.classList.add("filter-done")
      : item.classList.remove("filter-done");
  });
});

// Filter Done tasks
btnFilterDone.addEventListener("click", (e) => {
  const listLi = listTasks.querySelectorAll("li");
  listLi.forEach((item) => {
    item.firstChild.classList.contains("done")
      ? item.classList.remove("filter-done")
      : item.classList.add("filter-done");
  });
});

// Show All tasks
btnFilterAll.addEventListener("click", (e) => {
  const listLi = listTasks.querySelectorAll("li");
  listLi.forEach((li) => li.classList.remove("filter-done"));
});

// Manage task list
function manageList(item) {
  item.addEventListener("click", (e) => {
    item.classList.toggle("done");

    // get localStorage
    allTasks = JSON.parse(localStorage.getItem("allTasks"));

    // find item clicked
    const index = allTasks.findIndex(
      (task) => task.taskText === e.target.innerText
    );

    // change in localStorage
    const taskClick = allTasks[Number(index)];
    taskClick.taskDone
      ? (taskClick.taskDone = false)
      : (taskClick.taskDone = true);
    allTasks.push(taskClick);
    allTasks.splice(index, 1);
    localStorage.setItem("allTasks", JSON.stringify(allTasks));

    // change the list order
    const liClicked = e.target.parentElement;
    const ulChanged = liClicked.parentElement;
    ulChanged.removeChild(liClicked);
    if (e.target.classList.contains("done")) {
      ulChanged.insertAdjacentElement("beforeend", liClicked);
    } else {
      ulChanged.insertAdjacentElement("afterbegin", liClicked);
    }
  });
}

// Creat list item with task
function insertLi(task) {
  const newLi = document.createElement("li");
  newLi.classList.add("task");

  const newText = document.createElement("p");
  newText.classList.add("task-text");
  newText.insertAdjacentText("afterbegin", `${task.taskText}`);

  if (task.taskDone === true) {
    newText.classList.add("done");
  }

  newLi.insertAdjacentElement("afterbegin", newText);
  newLi.insertAdjacentHTML("beforeend", removeBtnHtml);

  manageList(newText);
  return newLi;
}

// Creat task
function createTask(e) {
  if (createTaskText.value !== "") {
    // insert task in localStorage
    allTasks.push({
      taskText: createTaskText.value,
      taskDone: false,
    });
    localStorage.setItem("allTasks", JSON.stringify(allTasks));

    setTimeout(() => {
      listTasks.insertAdjacentElement(
        "afterbegin",
        insertLi({
          taskText: createTaskText.value,
          taskDone: false,
        })
      );

      listenRemoveBtn();
      // clean input
      createTaskText.value = "";
    }, 2000);
  }
}
