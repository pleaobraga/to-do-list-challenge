import { STATUS, LIST } from "./enum.js";
import { Task } from "./task.js";

export class Todo {
  #darkTheme = false;
  #list = [];
  #taskID = 0;
  //Variavel que armazena o estrutura HTML da todo list
  #template = `
     <section class="to-do">
        <header class="to-do__header">
          <h1 class="to-do__title">TODO</h1>
          <img class="
           src="./Assets/Images/icon-moon.svg" alt="Uma lua">
        </header>
        <main class="to-do__main">
            <div class="to-do__new"> 
              <div class="to-do__new-container">
               <div class="to-do__new-icon"></div>
                <input type="text" class="to-do__new-input" placeholder="Create a new todo...">
                <p class="to-do__item--add">+</p>
              </div>
            </div>
            <ul class="to-do__list">
  
            </ul>
        </main>
        <footer class="to-do__footer">
          <div class="to-do__controller">
            <p class="to-do__itemsLeft">No records</p>
            <div class="to-do__filter to-do__filter--desktop">
              <button class="to-do__filter-all to-do__filter--focus">All</button>
              <button class="to-do__filter-active">Active</button>
              <button class="to-do__filter-completed">Completed</button>
            </div>
            <p class="to-do__clearCompleted">Clear completed</p>
          </div>
          <div class="to-do__filter to-do__filter--mobile">
            <button class="to-do__filter-all to-do__filter--focus">All</button>
            <button class="to-do__filter-active">Active</button>
            <button class="to-do__filter-completed">Completed</button>
          </div>
        </footer>
     </section>`;

  //Recebe como parametro o ELEMENTO PAI da todo list
  constructor(htmlElement) {
    this.todoListNodeStart = htmlElement;
  }

  set setDarkTheme(value) {
    if (value != true && value != false) {
      throw new Error("Dark theme nao pode receber valores diferentes de true e false");
    } else {
      this.#darkTheme = value;
    }
  }

  get getDarkTheme() {
    return this.#darkTheme;
  }

  getDragAfterElement(container, pointerTopCoordinate) {
    //Variavel responsavel por armazenar todos os elementos que sao arrastaveis em formato de array, com excecao do que esta sendo arrastado.
    const draggableTasks = [...container.querySelectorAll(".to-do__item:not(.to-do__item--dragging)")];
    return draggableTasks.reduce(
      (closest, task) => {
        //Variavel responsavel por armazenar o tamanho do elemento e suas posicoes relativas ao vw
        const taskContainer = task.getBoundingClientRect();
        //Variavel responsavel por armazenar o valor da distancia entre o cursor do mouse e o centro do container da task
        const offset = pointerTopCoordinate - taskContainer.top - taskContainer.height / 2;
        console.log(offset);
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: task };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  //Funcao responsavel por inicializar a todo list
  init() {
    this.todoListNodeStart.innerHTML += this.#template;
    const itemAddButton = document.querySelector(".to-do__item--add");
    const deleteCompletedItemsButton = document.querySelector(".to-do__clearCompleted");
    const filterActiveButton = document.querySelectorAll(".to-do__filter-active");
    const filterAllButton = document.querySelectorAll(".to-do__filter-all");
    const filterCompletedButton = document.querySelectorAll(".to-do__filter-completed");
    const toggleTheme = document.querySelector(".to-do__header-toggle-theme");
    const container = document.querySelector(".to-do__list");
    const appBackgroundMobile = document.querySelector(".app__background--mobile");
    const appBackgroundDesktop = document.querySelector(".app__background--desktop");
    const appBackgroundDefault = document.querySelector(".app__background--default");
    const newContainer = document.querySelector(".to-do__new-container");
    const app = document.querySelector(".app");

    toggleTheme.addEventListener("click", () => {
      this.setDarkTheme = !this.getDarkTheme;
      if (this.getDarkTheme === true) {
        toggleTheme.srcset = "../Assets/Images/icon-sun.svg";
        appBackgroundMobile.srcset = "../Assets/Images/bg-mobile-dark.jpg";
        appBackgroundDesktop.srcset = "../Assets/Images/bg-desktop-dark.jpg";
        appBackgroundDefault.src = "../Assets/Images/bg-desktop-dark.jpg";
      } else {
        toggleTheme.srcset = "../Assets/Images/icon-moon.svg";
        appBackgroundMobile.srcset = "../Assets/Images/bg-mobile-light.jpg";
        appBackgroundDesktop.srcset = "../Assets/Images/bg-desktop-light.jpg";
        appBackgroundDefault.src = "../Assets/Images/bg-desktop-light.jpg";
      }

      app.classList.toggle("dark-theme");
      document.querySelectorAll(".to-do__item-container .to-do__item-label").forEach((element) => {
        element.classList.toggle("dark-theme");
      });

      deleteCompletedItemsButton.classList.toggle("dark-theme");
      filterActiveButton.forEach((element) => {
        element.classList.toggle("dark-theme");
      });
      filterCompletedButton.forEach((element) => {
        element.classList.toggle("dark-theme");
      });
      filterAllButton.forEach((element) => {
        element.classList.toggle("dark-theme");
      });
      newContainer.classList.toggle("dark-theme");
      document.querySelector(".to-do__new-input").classList.toggle("dark-theme");
      document.querySelector(".to-do__list").classList.toggle("dark-theme");
      document.querySelector(".to-do__controller").classList.toggle("dark-theme");
      document.querySelector(".to-do__filter").classList.toggle("dark-theme");
      document.querySelector(".to-do__filter--mobile").classList.toggle("dark-theme");
      document.querySelector(".to-do__new-icon").classList.toggle("dark-theme");
      document.querySelectorAll(".to-do__item").forEach((element) => {
        element.classList.toggle("dark-theme");
      });
      document.querySelectorAll(".to-do__item--checked").forEach((element) => {
        element.classList.toggle("dark-theme");
      });
    });

    container.addEventListener("dragover", (event) => {
      event.preventDefault();
      const afterElement = this.getDragAfterElement(container, event.clientY);
      const draggableElement = document.querySelector(".to-do__item--dragging");
      if (afterElement == null) {
        container.appendChild(draggableElement);
      } else {
        container.insertBefore(draggableElement, afterElement);
      }
    });
    itemAddButton.addEventListener("click", (event) => {
      this.addTask(event.target.previousElementSibling.value);
      event.target.previousElementSibling.value = "";
    });

    deleteCompletedItemsButton.addEventListener("click", () => {
      this.deleteCompletedTasks();
    });

    filterActiveButton.forEach((element, index) =>
      element.addEventListener("click", () => {
        this.filterActive();
        filterActiveButton[index].classList.add("to-do__filter--focus");
        if (filterAllButton[index].classList.contains("to-do__filter--focus")) {
          filterAllButton[index].classList.remove("to-do__filter--focus");
        } else if (filterCompletedButton[index].classList.contains("to-do__filter--focus")) {
          filterCompletedButton[index].classList.remove("to-do__filter--focus");
        }
      })
    );

    filterAllButton.forEach((element, index) =>
      element.addEventListener("click", () => {
        this.filterAll();
        if (!filterAllButton[index].classList.contains("to-do__filter--focus"))
          filterAllButton[index].classList.add("to-do__filter--focus");
        if (filterActiveButton[index].classList.contains("to-do__filter--focus")) {
          filterActiveButton[index].classList.remove("to-do__filter--focus");
        } else if (filterCompletedButton[index].classList.contains("to-do__filter--focus")) {
          filterCompletedButton[index].classList.remove("to-do__filter--focus");
        }
      })
    );
    filterCompletedButton.forEach((element, index) =>
      element.addEventListener("click", () => {
        this.filterCompleted();
        filterCompletedButton[index].classList.add("to-do__filter--focus");
        if (filterActiveButton[index].classList.contains("to-do__filter--focus")) {
          filterActiveButton[index].classList.remove("to-do__filter--focus");
        } else if (filterAllButton[index].classList.contains("to-do__filter--focus")) {
          filterAllButton[index].classList.remove("to-do__filter--focus");
        }
      })
    );

    if (localStorage.getItem(LIST.todo).length > 0) {
      let list = JSON.parse(localStorage.getItem(LIST.todo));
      list.forEach((element) => {
        this.addTask(element.description, element.status === STATUS.checked ? STATUS.checked : STATUS.unchecked);
      });
    }
  }

  //Funcao responsavel por gerar um ID unico para as tasks
  generateTaskID() {
    this.#taskID++;
    return `to-do__item-${this.#taskID}`;
  }

  //Funcao responsavel por adicionar um novo item na lista
  addTask(description, status = STATUS.unchecked) {
    let todoList = document.querySelector(".to-do__list");
    let newTask;
    try {
      newTask = new Task(description, this.generateTaskID(), status);
    } catch (err) {
      alert(err);
    }
    todoList.insertAdjacentHTML("beforeend", newTask.createHtmlElement(this.#darkTheme));
    this.addTaskEvents(todoList.lastChild);
    this.#list.push(newTask);
    this.updateItemsLeft();
  }

  //funcao responsavel por contar quantos itens existem na lista
  countItems() {
    return this.#list.length;
  }

  //Funcao responsavel por atualizar o contador de itens no HTML
  updateItemsLeft() {
    let itemsLeft = document.querySelector(".to-do__itemsLeft");

    if (this.countItems() === 0) {
      itemsLeft.innerHTML = "No records";
    } else if (this.countItems() === 1) {
      itemsLeft.innerHTML = `${this.countItems()} item left`;
    } else itemsLeft.innerHTML = `${this.countItems()} items left`;
    localStorage.setItem(LIST.todo, JSON.stringify(this.#list));
  }

  //Funcao responsavel por deletar o item alvo
  deleteItem(event) {
    let targetElementID = event.target.previousElementSibling.firstElementChild.id;
    let targetElement = event.target.parentElement;

    this.#list.forEach((element, index) => {
      if (element.getID === targetElementID) {
        this.#list.splice(index, 1);
        targetElement.remove();
      } else {
        return;
      }
    });
    this.updateItemsLeft();
  }

  //Funcao responsavel por marcar ou desmarcar o item alvo

  checkItem(event) {
    let targetElementID = event.target.nextElementSibling.offsetParent.firstElementChild.id;
    this.#list.forEach((element) => {
      if (element.getID === targetElementID) {
        if (element.getStatus === STATUS.unchecked) {
          element.setStatus = STATUS.checked;
          document.querySelector(".app").classList.contains("dark-theme")
            ? event.target.nextElementSibling.classList.add("to-do__item--checked", "dark-theme")
            : event.target.nextElementSibling.classList.add("to-do__item--checked");
        } else {
          element.setStatus = STATUS.unchecked;
          document.querySelector(".app").classList.contains("dark-theme")
            ? event.target.nextElementSibling.classList.remove("to-do__item--checked", "dark-theme")
            : event.target.nextElementSibling.classList.remove("to-do__item--checked");
        }
      }
    });
    localStorage.setItem(LIST.todo, JSON.stringify(this.#list));
  }

  //Funcao responsavel por deletar todas as tarefas que ja foram feitas
  deleteCompletedTasks() {
    let completedTasks = document.querySelectorAll(".to-do__item--checked");
    completedTasks.forEach((task) => {
      task.parentElement.parentElement.remove();
    });

    let copiedList = this.#list.slice();
    this.#list.forEach((task) => {
      if (task.getStatus === STATUS.checked) copiedList.splice(copiedList.indexOf(task), 1);
    });
    this.#list = copiedList;
    this.updateItemsLeft();
  }

  //Funcao responsavel por adicionar todos os eventos pertinentes a cada item da todo list
  addTaskEvents(node) {
    //Seleciona todos os elementos que seram responsaveis pela funcao de marcar ou desmarcar um elemento
    let checkBoxElementList = node.firstElementChild.firstElementChild.nextElementSibling;
    //Seleciona todos os elementos que seram responsaveis pela funcao de deletar
    let deleteElementList = node.firstElementChild.nextElementSibling;

    let draggableTask = node;

    //Adiciona o evento para marcar o item alvo como feito ou desmarca-lo
    checkBoxElementList.addEventListener("click", (event) => {
      this.checkItem(event);
    });

    //Adiciona o evento para deletar o item alvo
    deleteElementList.addEventListener("click", (event) => {
      this.deleteItem(event);
    });

    draggableTask.addEventListener("dragstart", () => {
      draggableTask.classList.add("to-do__item--dragging");
    });

    draggableTask.addEventListener("dragend", () => {
      draggableTask.classList.remove("to-do__item--dragging");
    });
  }

  filterCompleted() {
    let AllTasks = document.querySelectorAll(".to-do__item");
    this.filterAll();
    AllTasks.forEach((task) => {
      if (task.firstElementChild.lastElementChild.classList.contains("to-do__item--checked")) {
        return;
      } else {
        task.classList.add("to-do__item--hide");
      }
    });
  }
  filterAll() {
    let AllTasks = document.querySelectorAll(".to-do__item");
    AllTasks.forEach((task) => {
      if (task.classList.contains("to-do__item--hide")) task.classList.remove("to-do__item--hide");
    });
  }
  filterActive() {
    let completedTasks = document.querySelectorAll(".to-do__item--checked");
    this.filterAll();
    completedTasks.forEach((task) => {
      if (task.parentElement.parentElement.classList.contains("to-do__item--hide")) {
        return;
      } else {
        task.parentElement.parentElement.classList.add("to-do__item--hide");
      }
    });
    this.updateItemsLeft();
  }
}
