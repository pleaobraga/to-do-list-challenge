import { Todo } from "./todo.js";

//Variavel responsavel por armazenar o elemento pai da todo list
let appMain = document.querySelector(".app__main");
//Variavel responsavel por armazenar a nova Todo List
const todoList = new Todo(appMain);
//Inicializa a todo List
todoList.init();
