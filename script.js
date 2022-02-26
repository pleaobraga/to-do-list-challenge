var newTask = document.getElementById("new_task");
var addButton = document.getElementById("new_task_button");
var toDo = document.getElementById("to_do");
var done = document.getElementById("done");

var newTaskElem = function(taskInput) {
    // a cada nova task, incluir uma linha no HTML
	var taskItem = document.createElement("li");

	// incluir campo input para usuario, tipo checkbox
	var checkbox = document.createElement("input");
	var labelCB = document.createElement("label");
    checkbox.type = "checkbox";
    labelCB.innerText=taskInput;
	
	// incluir botão delete
	var deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
	deleteButton.className = "delete";

	// append os "elementos" a nova task
	taskItem.appendChild(checkbox);
	taskItem.appendChild(labelCB);
	taskItem.appendChild(deleteButton);
	return taskItem;
}

// de fato adicionar ao TO DO o input da new task
var add = function() {
	// Puxar input da nova task
	var taskItem = newTaskElem(newTask.value);

	// incluir ao status to do a nova task com time out de 2s e ligar ao evento de done quando tiver input na checkbox
    setTimeout(() => {
        toDo.appendChild(taskItem);
    }, 2000)
	clickEvent(taskItem, taskDone);
	// limpar input apos nova task ser adicionada ao to do
    newTask.value = "";

    console.log("new task added");
}

addButton.onclick = add;

// click é trigger para os eventos que deletam a linha e todas suas "filhas" aka linha com task input, checkbox e botao delete
var clickEvent = function(taskItem,checkboxChange) {
	// puxar checkbox e linkar mudança no checkbox com funcao evento
	var checkbox = taskItem.querySelector("input[type=checkbox]");
    checkbox.onchange = checkboxChange;

    // puxar botao delete e linkar click a funcao do evento
	var deleteButton = taskItem.querySelector("button.delete");
	deleteButton.onclick = deleteTask;	

    saveTask(taskItem);
    console.log("linked task status to events");
}

// adicionar task ao DONE (tasks ja existentes)
var taskDone = function() {
	// puxa o id do pai para editar formatar em css
	var taskItem = this.parentNode;
	done.appendChild(taskItem);
    // quando evento ocorrer usar funcao to do, pois o evento fala que a task mudou do status Done para to do
	clickEvent(taskItem, taskToDo);

    saveTask(taskItem);
    console.log("task done");
}

// adicionar task to do que antes era done
var taskToDo = function() {
	var taskItem = this.parentNode;
	toDo.appendChild(taskItem);
	clickEvent(taskItem,taskDone);

    saveTask(taskItem);
    console.log("task pending");
}

// deletar task
var deleteTask = function() {
	var taskItem = this.parentNode;
	var ul = taskItem.parentNode;
	// remover li (filha) da ul, aqui inclui o input da task, o checkbox e o botao delete
	ul.removeChild(taskItem);

    saveTask(taskItem);
    console.log("task deleted");
}


// armazenar os dados no local storage
function saveTask(taskItem) {
    localStorage.setItem("tasks", JSON.stringify(taskItem));
    console.log("save task");
}

// retornar dados quando pagina carregar
window.addEventListener("load", () => {
    let tasks = JSON.parse(localStorage.getItem("taskItem"));
    console.log("retorno");
    return localStorage.getItem(tasks);
})
