class tasksList {
  // list data variables
  #tasks;
  #activeFilter;

  // DOM references variables
  #list;
  #docBody;
  #removeCompletedBtn;
  #removeCompletedModal;

  constructor(idList, idRemoveCompleted) {
    this.#tasks = [];
    this.#list = document.querySelector(`#${idList}`);
    this.#docBody = document.querySelector("body");
    this.#activeFilter = "";
    this.#removeCompletedModal = this.createDeleteModal(
      "Excluir todas as tarefas feitas?"
    );
    this.#removeCompletedBtn = document.querySelector(`#${idRemoveCompleted}`);
    this.setRemoveCompletedControls();
  }

  add(name, done = false) {
    const data = {
      name: name,
      done: done,
    };

    this.#tasks.push(data);
    this.saveData();
    this.addToUI(data);
  }

  saveData() {
    localStorage.setItem("db", JSON.stringify(this.#tasks));
  }

  addToUI(data) {
    const listItem = this.createListItem(data);
    this.#list.appendChild(listItem);

    if (data.done && this.#activeFilter === "uncompleted") {
      listItem.style.display = "none";
    } else if (!data.done && this.#activeFilter === "completed") {
      listItem.style.display = "none";
    }

    const checkbox = listItem.querySelector("input[type='checkbox']");
    this.changeItemStatus(listItem, checkbox, data);
  }

  createListItem(data) {
    const { name, done } = data;

    const li = document.createElement("li");
    const title = document.createElement("h3");
    title.textContent = name;

    const status = document.createElement("input");
    status.dataset.elemName = "checkbox";
    status.setAttribute("type", "checkbox");
    status.setAttribute("defaultChecked", "false");
    if (done) {
      status.checked = true;
    }

    const editBtn = document.createElement("button");
    editBtn.dataset.elemName = "edit-button";

    const deleteBtn = document.createElement("button");
    deleteBtn.dataset.elemName = "delete-button";

    const control = document.createElement("div");

    control.appendChild(status);
    control.appendChild(editBtn);
    control.appendChild(deleteBtn);
    li.appendChild(title);
    li.appendChild(control);

    this.setControlFunctions(li, data);

    return li;
  }

  setControlFunctions(li, data) {
    const modalDel = this.createDeleteModal();
    modalDel.addEventListener("click", (e) => {
      this.handleDelete(e, li, data, modalDel);
    });

    const modalEdit = this.createEditModal();
    modalEdit.addEventListener("click", (e) => {
      this.handleEdit(e, li, data, modalEdit);
    });

    li.addEventListener("click", (e) => {
      const controlName = e.target.dataset.elemName;

      switch (controlName) {
        case "delete-button":
          this.showModal(modalDel);
          break;

        case "edit-button":
          this.showModal(modalEdit, li);
          break;

        case "checkbox":
          this.changeItemStatus(li, e.target, data);
          this.filterItems();
          break;
      }
    });
  }

  createDeleteModal(titleText = "Excluir tarefa?") {
    const wrapper = document.createElement("div");
    wrapper.classList.add("modal-wrapper");
    wrapper.classList.add("modal-wrapper--delete");

    const modal = document.createElement("div");
    modal.classList.add("modal");

    const blurredBG = document.createElement("div");
    blurredBG.classList.add("bg-img");

    const title = document.createElement("h3");
    title.classList.add("modal__title");
    title.textContent = titleText;

    const control = document.createElement("div");
    control.classList.add("modal__buttons");

    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("id", "apply-change");

    const cancelBtn = document.createElement("button");
    cancelBtn.setAttribute("id", "cancel-change");

    control.appendChild(deleteBtn);
    control.appendChild(cancelBtn);
    modal.appendChild(title);
    modal.appendChild(control);
    wrapper.appendChild(modal);
    wrapper.appendChild(blurredBG);

    return wrapper;
  }

  showModal(modal, item = null) {
    this.#docBody.appendChild(modal);
    modal.style.display = "block";

    const input = modal.querySelector("input");
    if (input) {
      const currentValue = item.querySelector("h3").textContent;
      input.focus();
      input.value = currentValue;
    }
  }

  handleDelete(e, li, data, modal) {
    const action = e.target.id;
    const modalBackground = modal.querySelector(".bg-img");

    if (action === "apply-change") {
      this.#list.removeChild(li);
      let index = this.#tasks.indexOf(data);
      if (index !== -1) {
        this.#tasks.splice(index, 1);
        this.saveData();
      }
      this.#docBody.removeChild(modal);
    } else if (action === "cancel-change") {
      modal.style.display = "none";
    } else if (e.target === modalBackground) {
      modal.style.display = "none";
    }
  }

  createEditModal() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("modal-wrapper");
    wrapper.classList.add("modal-wrapper--edit");

    const modal = document.createElement("div");
    modal.classList.add("modal");

    const blurredBG = document.createElement("div");
    blurredBG.classList.add("bg-img");

    const title = document.createElement("h3");
    title.classList.add("modal__title");
    title.textContent = "Modificar tarefa?";

    const input = document.createElement("input");
    input.classList.add("modal__input");
    input.setAttribute("type", "text");

    const control = document.createElement("div");
    control.classList.add("modal__buttons");

    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("id", "apply-change");

    const cancelBtn = document.createElement("button");
    cancelBtn.setAttribute("id", "cancel-change");

    control.appendChild(deleteBtn);
    control.appendChild(cancelBtn);
    modal.appendChild(title);
    modal.appendChild(input);
    modal.appendChild(control);
    wrapper.appendChild(modal);
    wrapper.appendChild(blurredBG);

    return wrapper;
  }

  handleEdit(e, li, data, modal) {
    const action = e.target.id;
    const input = modal.querySelector("input");
    const modalBackground = modal.querySelector(".bg-img");

    if (action === "apply-change") {
      if (input.value === "") {
        return;
      }
      data.name = input.value;
      li.querySelector("h3").textContent = data.name;
      this.saveData();
      modal.style.display = "none";
    } else if (action === "cancel-change") {
      modal.style.display = "none";
    } else if (e.target === modalBackground) {
      modal.style.display = "none";
    }
  }

  changeItemStatus(item, checkbox, data) {
    const title = item.querySelector("h3");
    data.done = checkbox.checked;

    if (data.done) {
      title.classList.add("cross-item");
    } else {
      title.classList.remove("cross-item");
    }

    this.saveData();
  }

  setFilter(filterValue) {
    this.#activeFilter = filterValue;
    localStorage.setItem("filter", filterValue);
    this.filterItems(filterValue);
  }

  filterItems(filterValue = this.#activeFilter) {
    const items = this.#list.childNodes;

    switch (filterValue) {
      case "all":
        this.#removeCompletedBtn.parentNode.style.display = "none";
        this.filterAll(items);
        break;

      case "uncompleted":
        this.#removeCompletedBtn.parentNode.style.display = "none";
        this.filterUncompleted(items);
        break;

      case "completed":
        this.#removeCompletedBtn.parentNode.style.display = "block";
        this.filterCompleted(items);

        break;
    }
  }

  filterAll(li) {
    li.forEach((item) => (item.style.display = "flex"));
  }

  filterUncompleted(li) {
    this.#tasks.forEach((task, index) => {
      if (task.done) {
        li[index].style.display = "none";
      } else {
        li[index].style.display = "flex";
      }
    });
  }

  filterCompleted(li) {
    this.#tasks.forEach((task, index) => {
      if (task.done) {
        li[index].style.display = "flex";
      } else {
        li[index].style.display = "none";
      }
    });
  }

  setRemoveCompletedControls() {
    this.#removeCompletedModal.addEventListener("click", (e) => {
      this.handleRemoveCompleted(e);
    });

    this.#removeCompletedBtn.addEventListener("click", () => {
      this.showModal(this.#removeCompletedModal);
    });
  }

  handleRemoveCompleted(e) {
    const action = e.target.id;
    const modalBackground = this.#removeCompletedModal.querySelector(".bg-img");

    if (action === "apply-change") {
      this.removeCompletedTasks();
      this.#removeCompletedModal.style.display = "none";
    } else if (action === "cancel-change") {
      this.#removeCompletedModal.style.display = "none";
    } else if (e.target === modalBackground) {
      this.#removeCompletedModal.style.display = "none";
    }
  }

  removeCompletedTasks() {
    const items = this.#list.childNodes;
    const deletedItems = [];

    this.#tasks = this.#tasks.filter((task, index) => {
      if (task.done) {
        deletedItems.push(items[index]);
        return false;
      }
      return true;
    });

    deletedItems.forEach((deletedItem) => {
      this.#list.removeChild(deletedItem);
    });

    this.saveData();
  }
}

// uses the tasksList class functionality and sets the needed controls
const myTasks = new tasksList("list", "rm-completed-btn");
const taskInput = document.querySelector("#new-task");
const addForm = document.querySelector("form");
const filterButtons = document.querySelectorAll("input[type='radio']");
let activeFilter;

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (taskInput.value !== "") {
    let taskName = taskInput.value;
    setTimeout(() => {
      myTasks.add(taskName);
    }, 2000);

    addForm.classList.remove("error-message");
  } else {
    addForm.classList.add("error-message");
  }

  taskInput.value = "";
  taskInput.focus();
});

filterButtons.forEach((filter) => {
  filter.addEventListener("change", (e) => {
    activeFilter = e.target.value;
    myTasks.setFilter(activeFilter);
  });
});

window.addEventListener("load", () => {
  let myDB = JSON.parse(localStorage.getItem("db"));
  activeFilter = localStorage.getItem("filter") || "all";

  if (myDB) {
    myDB.forEach(({ name, done }) => {
      myTasks.add(name, done);
    });
  }

  taskInput.focus();

  myTasks.setFilter(activeFilter);

  filterButtons.forEach((filter) => {
    if (filter.value === activeFilter) {
      filter.setAttribute("checked", "true");
    }
  });
});
