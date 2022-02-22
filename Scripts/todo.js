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
          <img class="to-do__header-toggle-theme" src="./Assets/Images/icon-moon.svg" alt="Uma lua">
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
  //Atribui a variavel privada darkTheme do objeto com o valor caso ele seja true ou false, qualquer coisa diferente disso ele emite um erro e nao faz a atribuicao
  set setDarkTheme(value) {
    if (value != true && value != false) {
      throw new Error("Dark theme nao pode receber valores diferentes de true e false");
    } else {
      this.#darkTheme = value;
    }
  }
  //Retorna o valor da variavel privada darkTheme
  get getDarkTheme() {
    return this.#darkTheme;
  }

  // Metodo responsavel por retonar o elemento de referencia para o elemento que sera inserido apos o usuario soltar o elemento no container
  getDragAfterElement(container, pointerTopCoordinate) {
    //Variavel responsavel por armazenar todos os elementos que sao arrastaveis em formato de array, com excecao do que esta sendo arrastado.
    const draggableTasks = [...container.querySelectorAll(".to-do__item:not(.to-do__item--dragging)")];
    return draggableTasks.reduce(
      (closest, task) => {
        //Variavel responsavel por armazenar o tamanho do elemento e suas posicoes relativas ao vw
        const taskContainer = task.getBoundingClientRect();
        //Variavel responsavel por armazenar o valor da distancia entre o cursor do mouse e o centro do container da task
        const offset = pointerTopCoordinate - taskContainer.top - taskContainer.height / 2;

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
    // Todas as variaveis contidas abaixo sao referencias de elementos HTML
    const app = document.querySelector(".app");
    const itemAddButton = document.querySelector(".to-do__item--add");
    const deleteCompletedItemsButton = document.querySelector(".to-do__clearCompleted");
    const filterContainer = document.querySelector(".to-do__filter");
    const filterContainerMobile = document.querySelector(".to-do__filter--mobile");
    const filterActiveButton = document.querySelectorAll(".to-do__filter-active");
    const filterAllButton = document.querySelectorAll(".to-do__filter-all");
    const filterCompletedButton = document.querySelectorAll(".to-do__filter-completed");
    const toggleTheme = document.querySelector(".to-do__header-toggle-theme");
    const container = document.querySelector(".to-do__list");
    const appBackgroundMobile = document.querySelector(".app__background--mobile");
    const appBackgroundDesktop = document.querySelector(".app__background--desktop");
    const appBackgroundDefault = document.querySelector(".app__background--default");
    const newContainer = document.querySelector(".to-do__new-container");
    const newInput = document.querySelector(".to-do__new-input");
    const newIcon = document.querySelector(".to-do__new-icon");
    const controller = document.querySelector(".to-do__controller");

    // Funcao responsavel por mudar o tema de light para dark e vice e versa
      this.setDarkTheme = !this.getDarkTheme;
      if (this.getDarkTheme === true) {
        toggleTheme.srcset = "./Assets/Images/icon-sun.svg";
        appBackgroundMobile.srcset = "./Assets/Images/bg-mobile-dark.jpg";
        appBackgroundDesktop.srcset = "./Assets/Images/bg-desktop-dark.jpg";
        appBackgroundDefault.src = "./Assets/Images/bg-desktop-dark.jpg";
      } else {
        toggleTheme.srcset = "./Assets/Images/icon-moon.svg";
        appBackgroundMobile.srcset = "./Assets/Images/bg-mobile-light.jpg";
        appBackgroundDesktop.srcset = "./Assets/Images/bg-desktop-light.jpg";
        appBackgroundDefault.src = "./Assets/Images/bg-desktop-light.jpg";
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
      newInput.classList.toggle("dark-theme");
      container.classList.toggle("dark-theme");
      controller.classList.toggle("dark-theme");
      filterContainer.classList.toggle("dark-theme");
      filterContainerMobile.classList.toggle("dark-theme");
      newIcon.classList.toggle("dark-theme");
      document.querySelectorAll(".to-do__item").forEach((element) => {
        element.classList.toggle("dark-theme");
      });
      document.querySelectorAll(".to-do__item--checked").forEach((element) => {
        element.classList.toggle("dark-theme");
      });
    });

    //Quando o usuario estiver arrastando a tarefa sobre outra tarefa este evento eh acionado
    container.addEventListener("dragover", (event) => {
      //Este prevent default serve para que o comportamento padrao do browser de nao permitir que alguem arraste e largue elementos seja permitido na area do container
      event.preventDefault();
      //Essa variavel representa um elemento de referencia para que o elemento draggable seja inserido referenciando se eh depois ou antes dele
      const afterElement = this.getDragAfterElement(container, event.clientY);
      const draggable = document.querySelector(".to-do__item--dragging");
      if (afterElement == null) {
        container.appendChild(draggable);
      } else {
        container.insertBefore(draggable, afterElement);
      }
    });
    //Chama o metodo de adicionar a tarefa quando o usuario clicar no botao de adicionar
    itemAddButton.addEventListener("click", (event) => {
      this.addTask(event.target.previousElementSibling.value);
      event.target.previousElementSibling.value = "";
    });
    //Chama o metodo de deletar todas as tarefas completas quando o usuario clicar no botao de deletar todos as tarefas feitas
    deleteCompletedItemsButton.addEventListener("click", () => {
      this.deleteCompletedTasks();
    });
    //Para cada elemento do filterCompleteButton adiciono o metodo de filtrar correspondente, atribuo a classe de focus ao elemento alvo e para os outros elementos de filtro faco a verificacao se eles tem a classe de focus, se tiverem eu removo.
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
    //Para cada elemento do filterCompleteButton adiciono o metodo de filtrar correspondente, atribuo a classe de focus ao elemento alvo e para os outros elementos de filtro faco a verificacao se eles tem a classe de focus, se tiverem eu removo.
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
    //Para cada elemento do filterCompleteButton adiciono o metodo de filtrar correspondente, atribuo a classe de focus ao elemento alvo e para os outros elementos de filtro faco a verificacao se eles tem a classe de focus, se tiverem eu removo.
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

  //Funcao responsavel por adicionar um novo item na lista e fazer a chamada dos metodos que adicionam as funcoes dos elementos.
  addTask(description, status = STATUS.unchecked) {
    let todoList = document.querySelector(".to-do__list");
    let newTask;
    try {
      newTask = new Task(description, this.generateTaskID(), status);
    } catch (err) {
      alert(err);
    }
    // Apenas executa o codigo caso o codigo do try catch nao tenha dado erro, pois se der erro o newTask eh undefined.
    if (newTask === undefined) {
      return;
    } else {
      //Utilizo o insertAdjacentHTML para adicionar o elemento HTML criado pelo createHtmlElement
      todoList.insertAdjacentHTML("beforeend", newTask.createHtmlElement(this.#darkTheme));
      //Adiciona ao ultimo filho (Ultima tarefa adicionada, ou seja a nova tarefa) os eventos pertinentes a ela.
      this.addTaskEvents(todoList.lastChild);
      //Adiciona a nova tarefa a lista
      this.#list.push(newTask);
      this.updateItemsLeft();
    }
  }

  //funcao responsavel por contar quantos itens existem na lista
  countItems() {
    return this.#list.length;
  }

  //Funcao responsavel por atualizar o contador de itens no HTML
  updateItemsLeft() {
    // variavel que recebe o elemento HTML que representa o contador de itens
    let itemsLeft = document.querySelector(".to-do__itemsLeft");

    // Aqui eh feito um tratamento de mensagens, caso a funcao countItems que conta o numero de itens no todolist retornar zero, retorna No Records, caso seja 1, retornar mensagen no singular, caso seja mais de 1 retornar mensagem no plurarl
    if (this.countItems() === 0) {
      itemsLeft.innerHTML = "No records";
    } else if (this.countItems() === 1) {
      itemsLeft.innerHTML = `${this.countItems()} item left`;
    } else itemsLeft.innerHTML = `${this.countItems()} items left`;

    //Ao final de cada chamada de update determinei que seria a hora ideal de alocar isso no localStorage, dado que o UpdateItems soh eh chamado em momentos de adicao e delecao de itens.
    localStorage.setItem(LIST.todo, JSON.stringify(this.#list));
  }

  //Funcao responsavel por deletar o item alvo
  deleteItem(event) {
    // variavel que armazena o id do elemento alvo
    let targetElementID = event.target.previousElementSibling.firstElementChild.id;
    // variavel que armazena o elemento alvo
    let targetElement = event.target.parentElement;

    //Para cada item da lista de tarefas verifico se o ID do elemento bate com o ID do elemento clicado, caso bata eu deleto o item da lista, caso nao eu retorno vazio
    this.#list.forEach((element, index) => {
      if (element.getID === targetElementID) {
        this.#list.splice(index, 1);
        targetElement.remove();
      } else {
        return;
      }
    });
    //Chamada da funcao updateItemsLeft que atualiza o contador de itens
    this.updateItemsLeft();
  }

  //Funcao responsavel por marcar ou desmarcar o item alvo
  checkItem(event) {
    // Variavel responsavel por receber o ID do elemento alvo
    let targetElementID = event.target.nextElementSibling.offsetParent.firstElementChild.id;
    //Aqui estou comparando o ID que tenho na lista com o ID do elemento alvo para que eu possa atualizar o elemento da lista da classe com a informacao correta
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
    //Tomei a decisao de chamar o local storage aqui pois eh necessario salvar o estado atualizado de cada elemento.
    localStorage.setItem(LIST.todo, JSON.stringify(this.#list));
  }

  //Funcao responsavel por deletar todas as tarefas que ja foram feitas
  deleteCompletedTasks() {
    //Recebe todas os elementos que estao com a classe q determina se essas tarefas estao concluidas ou nao
    let completedTasks = document.querySelectorAll(".to-do__item--checked");
    //Para cada tarefa concluida remova o elemento.
    completedTasks.forEach((task) => {
      task.parentElement.parentElement.remove();
    });
    //Criei uma copia da lista para poder percorrer com o for e deletar da lista sem que alterasse o tamanho da lista original enquanto a iteracao ocorre
    let copiedList = this.#list.slice();
    //Para cada tarefa da lista, verifico se o status eh de tarefa concluida(checked) ou de nao concluida(unchecked), caso seja checked removo o elemento passando o indice desse elemento pelo indexOf e a quantidade de itens para o splice
    this.#list.forEach((task) => {
      if (task.getStatus === STATUS.checked) copiedList.splice(copiedList.indexOf(task), 1);
    });
    //Ao final preciso que a lista original seja alterada, portanto faco uma atribuicao da lista copiada (Que sofreu alteracoes) para a lista original
    this.#list = copiedList;
    //Chamada da funcao updateItemsLeft que atualiza o contador de itens
    this.updateItemsLeft();
  }

  //Funcao responsavel por adicionar todos os eventos pertinentes a cada item da todo list
  addTaskEvents(node) {
    //Seleciona todos os elementos que seram responsaveis pela funcao de marcar ou desmarcar um elemento
    let checkBoxElementList = node.firstElementChild.firstElementChild.nextElementSibling;
    //Seleciona todos os elementos que seram responsaveis pela funcao de deletar
    let deleteElementList = node.firstElementChild.nextElementSibling;
    //Recebe o elemento que eh arrastavel
    let draggableTask = node;

    //Adiciona o evento para marcar o item alvo como feito ou desmarca-lo
    checkBoxElementList.addEventListener("click", (event) => {
      this.checkItem(event);
    });

    //Atribui o metodo responsavel por deletar o item da lista quando o usuario clicar sobre o icone de deletar
    deleteElementList.addEventListener("click", (event) => {
      this.deleteItem(event);
    });
    //Adiciona a classe to-do__item--dragging quando o usuario comeca a arrastar a tarefa.
    draggableTask.addEventListener("dragstart", () => {
      draggableTask.classList.add("to-do__item--dragging");
    });
    //Remove a classe to-do__item--dragging quando o usuario parar de arrastar a tarefa
    draggableTask.addEventListener("dragend", () => {
      draggableTask.classList.remove("to-do__item--dragging");
    });
    draggableTask.addEventListener("mouseover", () => {
      deleteElementList.style.display = "block";
    });
    draggableTask.addEventListener("mouseleave", () => {
      deleteElementList.style.display = "none";
    });
  }

  //Funcao responsavel por filtrar os itens completos
  filterCompleted() {
    //Variavel eh atribuida com todos as tarefas
    let allTasks = document.querySelectorAll(".to-do__item");
    //Chamo a funcao filtrar todos para nao ter que criar condicoes caso o usuario clique no filtro ativo, e vice e versa.
    //Em outras palavras esse filterall serve como um reset para essa funcao, eh como se eu aplicasse o filtro em uma lista q ainda n foi filtrada
    this.filterAll();
    //Para cada elemento dessa variavel eh feito uma checagem afim de ver se ela contem ou nao a classe que determina se essa atividade esta concluida ou nao, se contem retorna vazio, caso nao contenha ela adiciona a classe para esconder o elemento.
    allTasks.forEach((task) => {
      if (task.firstElementChild.lastElementChild.classList.contains("to-do__item--checked")) {
        return;
      } else {
        task.classList.add("to-do__item--hide");
      }
    });
  }

  //Funcao responsavel por filtrar todos os itens
  filterAll() {
    //Variavel eh atribuida com todos as tarefas
    let allTasks = document.querySelectorAll(".to-do__item");
    //Para cada elemento dessa variavel eh feito uma checagem afim de ver se ela contem a classe que a esconde caso contenha ela remove a classe que esconde o elemento.
    allTasks.forEach((task) => {
      if (task.classList.contains("to-do__item--hide")) task.classList.remove("to-do__item--hide");
    });
  }

  //Funcao responsavel por filtrar os itens ativos
  filterActive() {
    //Variavel eh atribuida com apenas as tarefas que estao marcadas como feitas.
    let completedTasks = document.querySelectorAll(".to-do__item--checked");
    //Chamo a funcao filtrar todos para nao ter que criar condicoes caso o usuario clique no filtro dos completados, e vice e versa.
    //Em outras palavras esse filterall serve como um reset para essa funcao, eh como se eu aplicasse o filtro em uma lista q ainda n foi filtrada
    this.filterAll();
    //Para cada elemento dessa variavel eh feito uma checagem afim de ver se ela contem ou nao a classe que a esconde, se contem retorna vazio, caso nao contenha ela adiciona a classe para esconder o elemento.
    completedTasks.forEach((task) => {
      if (task.parentElement.parentElement.classList.contains("to-do__item--hide")) {
        return;
      } else {
        task.parentElement.parentElement.classList.add("to-do__item--hide");
      }
    });
  }
}
