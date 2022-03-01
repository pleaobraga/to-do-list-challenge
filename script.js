//Selecionando os elementos globais no DOM.
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");

//função de adicionar novo todo, criando elementos dinamicamente.
const addNewTodo = function () {
  if (todoInput.value === "") {
    return alert("Cannot add a task without an entry!");
  }

  let allTodos = document.querySelectorAll(".todo");
  console.log('.todo')

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  todoDiv.id = allTodos.length; 

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("checkbox");
  todoDiv.appendChild(checkbox);

  const todoLi = document.createElement("li");
  todoLi.classList.add("todo-list");
  todoLi.innerText = todoInput.value;

  todoDiv.appendChild(todoLi);

  //chamando função de salvar no banco de dados.
  savedataBase(todoInput.value);

  todoList.appendChild(todoDiv);
  todoInput.value = "";
};

//deletar e verificar todos.
const check = function (evt) {
  const item = evt.target;
  const todo = item.parentNode;

  if (item.classList[0] === "checkbox") {
    todo.classList.toggle("completed");

    let todosArray = JSON.parse(localStorage.getItem("todos")); 
    todosArray[todo.id].checked = todosArray[todo.id].checked === true ? false : true; 
    localStorage.setItem("todos", JSON.stringify(todosArray)); 
  }
};

//adicionando evento as funções.
todoBtn.addEventListener("click", (event) =>{
  event.preventDefault();

  setTimeout(() => {
    addNewTodo();
}, 2000)
});

todoList.addEventListener("click", check);

//salvando no local storage
function savedataBase(value) {
  let todo = {};
  todo.description = value;
  todo.checked = false;
 
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

const getItem = JSON.parse(localStorage.getItem("todos"));
console.log(getItem);

//Renderizando elementos na tela após recarregar a pagina
function renderTodo (){
  getItem.forEach( (element, index) => {
  
  let allTodos = document.querySelectorAll(".todo");
  console.log('.todo')

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  todoDiv.id = allTodos.length;
  const checkbox = document.createElement("input");
  
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("checkbox");
  todoDiv.appendChild(checkbox);

  const todoLi = document.createElement("li");
  todoLi.classList.add("todo-list");

  //elemento que esta renderizando
  todoLi.innerText = element.description;

  todoDiv.appendChild(todoLi);
  todoList.appendChild(todoDiv);

  todoInput.value = ""; 
  
});
}

renderTodo();