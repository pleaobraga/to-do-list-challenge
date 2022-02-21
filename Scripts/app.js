import { Todo } from "./todo.js";

let appMain = document.querySelector(".app__main");
const todoList = new Todo(appMain);
todoList.init();
