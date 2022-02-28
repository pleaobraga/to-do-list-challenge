const pegaBotao = document.querySelector("button");
const pegaInput = document.querySelector("input");
const pegaUl = document.querySelector("ul");
const tarefas = [];

function carregarTarefas() {
  const listaTarefas = JSON.parse(pegaNoLocalStorage());
  if (listaTarefas) listaTarefas.map((tarefa) => tarefas.push(tarefa));

  if (tarefas) {
    tarefas.map((tarefa) => {
      criarLinha(tarefa.nome, tarefa.id);
      if (!tarefa.estado) {
        assinalarTarefa(document.getElementById(tarefa.id));
      }
    });
  }
}

function adicionaElemento() {
  setTimeout(() => {
    if (bloqueiaTextoVazio() > 2) {
      const dado = criarDado();
      salvaDados(dado);
      criarLinha(dado.nome, dado.id);
    }
  }, 2000);
}

function criarDado() {
  const dados = JSON.parse(pegaNoLocalStorage());
  let dado;

  if (dados && dados.length) {
    const ultimoId = dados[dados.length - 1]?.id;

    if (ultimoId) {
      dado = {
        id: ultimoId + 1,
        nome: pegaInput.value,
        estado: true,
      };
    }
  } else {
    dado = {
      id: 1,
      nome: pegaInput.value,
      estado: true,
    };
  }

  return dado;
}

function salvaDados(dado) {
  tarefas.push(dado);
  salvaNoLocalStorage(tarefas);
}

function salvaNoLocalStorage(tarefas) {
  localStorage.setItem("banco", JSON.stringify(tarefas));
}

function pegaNoLocalStorage() {
  return localStorage.getItem("banco");
}

function bloqueiaTextoVazio() {
  return pegaInput.value.length;
}

function criarLinha(nome, id) {
  const novoLi = document.createElement("li");
  novoLi.setAttribute("id", id);
  novoLi.appendChild(document.createTextNode(nome));
  pegaUl.appendChild(novoLi);
  pegaInput.value = "";
  novoLi.addEventListener("click", (e) => tarefaRealizada(novoLi));

  const botaoDelete = document.createElement("button");
  botaoDelete.appendChild(document.createTextNode("DELETAR"));
  novoLi.appendChild(botaoDelete);
  botaoDelete.classList.add("delete");
  botaoDelete.addEventListener("click", (e) =>
    deletaItemDaLista(botaoDelete.parentNode)
  );
}

function tarefaRealizada(elemento) {
  tarefas.map((tarefa) => {
    if (tarefa.id == elemento.id) {
      tarefa.estado = !tarefa.estado;
      assinalarTarefa(elemento);
    }
  });
  salvaNoLocalStorage(tarefas);
}

function assinalarTarefa(elemento) {
  elemento.classList.toggle("tarefa-realizada");
}

function deletaItemDaLista(element) {
  pegaUl.removeChild(document.getElementById(element.id));
  for (let i = 0; i < tarefas.length; i++) {
    if (tarefas[i].id == element.id) {
      tarefas.splice(i, 1);
      console.log(tarefas);
      salvaNoLocalStorage(tarefas);
    }
  }
}

pegaBotao.addEventListener("click", adicionaElemento);
