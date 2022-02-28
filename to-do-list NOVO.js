console.log("=== TO DO LIST ===");

const lista_tarefas = []; 

const colocarTarefas = document.querySelector(".todo-input");
const botaoTarefas = document.querySelector(".todo-button");
const listaTarefas = document.querySelector(".todo-list");



botaoTarefas.addEventListener("click", (evt) => {
  
  let nomeDaTarefa = colocarTarefas.value; // pega o nome
  salvarNoBancoDeDados(nomeDaTarefa);// função que ainda vai ser criada pra salvar o dados
  colocarTarefas.value = ""; // limpa o campo aqui
  adcTarefas(nomeDaTarefa, evt);

});

listaTarefas.addEventListener("click", checarExcluir);


function adcTarefas(nomeDaTarefa, evt) {


  setTimeout(function () {

    const tarefasDiv = document.createElement("div");
    tarefasDiv.classList.add("todo");
    tarefasDiv.appendChild(tarefasLi);
    console.log("CLICOU");

    const botaoCheck = document.createElement("button");
    botaoCheck.innerHTML = "Feito";
    botaoCheck.classList.add("botao-feito");
    tarefasDiv.appendChild(botaoCheck);

    const botaoExcluir = document.createElement("button");
    botaoExcluir.innerHTML = "deletar";
    botaoExcluir.classList.add("botao-deletar");
    tarefasDiv.appendChild(botaoExcluir);

    listaTarefas.appendChild(tarefasDiv);
  }, 2000);


  const tarefasLi = document.createElement("li");
  tarefasLi.classList.add("todo-list");
  tarefasLi.innerText = nomeDaTarefa; 

  evt.preventDefault();
  console.log("DEU CERTO!!!!!!!!!!!");

}

function salvarNoBancoDeDados(nomeDaTarefa) {
  
  if(localStorage.getItem('lista_tarefas') === null){
  } else {
    todos = JSON.parse(localStorage.getItem('lista_tarefas'))
  }

 lista_tarefas.push(nomeDaTarefa);
 localStorage.setItem('lista_tarefas', JSON.stringify(lista_tarefas));
}


function pegarTarefas() {
  
  if(localStorage.getItem('lista_tarefas') === null){
  } else {
    todos = JSON.parse(localStorage.getItem('lista_tarefas'));
  };


    lista_tarefas.forEach(function(todo) {
    
    const tarefasDiv = document.createElement("div");
    tarefasDiv.classList.add("todo");

    const tarefasLi = document.createElement("li");
    tarefasLi.classList.add("todo-list");
    tarefasLi.innerText = colocarTarefas;
    tarefasDiv.appendChild(tarefasLi);


    const botaoCheck = document.createElement("button");
    botaoCheck.innerHTML = "Feito";
    botaoCheck.classList.add("botao-feito");
    tarefasDiv.appendChild(botaoCheck);


    const botaoExcluir = document.createElement("button");
    botaoExcluir.innerHTML = "deletar";
    botaoExcluir.classList.add("botao-deletar");
    tarefasDiv.appendChild(botaoExcluir);

    listaTarefas.appendChild(tarefasDiv)

    todo = nomeDaTarefa;

  });
};




function checarExcluir(e) {
  console.log(e.target);

  const itemLista = e.target;

  if (itemLista.classList[0] === "botao-deletar") {
    const todo = itemLista.parentElement;
    todo.remove();
  }

  if (itemLista.classList[0] === "botao-feito") {
    const todo = itemLista.parentElement;
    todo.classList.toggle("completed");
  }
}




function removerTarefas(todo){


  if(localStorage.getItem('lista_tarefas') === null){
  } else {
    todos = JSON.parse(localStorage.getItem('lista_tarefas'));
  }

  const tarefasIndex = todo.children[0].innerText;
removeItem((lista_tarefas.indexOf(tarefasIndex), 1));

  localStorage.setItem("lista_tarefas", JSON.stringify(banco));

}
