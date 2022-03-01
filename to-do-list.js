const form = document.querySelector("#form-novaTarefa");
const input = document.querySelector("#input-novaTarefa");
const el_lista = document.querySelector("#tarefas");
const minhasTarefas = JSON.parse(localStorage.getItem('storageTarefa')) || []


function renderizarStorage() {
    minhasTarefas.forEach((element, i) => {

        tarefa = element.item;
        tarefaStatus = element.status;

        const el_tarefa = document.createElement("div");
        el_tarefa.classList.add("tarefa");
        const conteudo_tarefa = document.createElement("div");
        conteudo_tarefa.classList.add("conteudo");
        el_tarefa.appendChild(conteudo_tarefa);

        const input_tarefa = document.createElement("input");

        if (tarefaStatus === "feito") {
            input_tarefa.classList.remove("texto")
            input_tarefa.classList.add("textoFeito")
        } else if (tarefaStatus === "não feito") {
            input_tarefa.classList.remove("textoFeito")
            input_tarefa.classList.add("texto");
        };

        input_tarefa.type = "text";
        input_tarefa.value = tarefa;
        input_tarefa.setAttribute("readonly", "readonly");
        conteudo_tarefa.appendChild(input_tarefa);
        const acoes_tarefa = document.createElement('div');
        acoes_tarefa.classList.add("acoes");

        el_tarefa.appendChild(acoes_tarefa);

        el_lista.appendChild(el_tarefa);

    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    setTimeout(() => {

        const storageTarefa = {
            item: input.value,
            status: "não feito"
        }

        let tarefa = storageTarefa.item;

        if (!tarefa) {
            alert("Campo Vazio, preecha com sua tarefa!");
            return;
        }

        minhasTarefas.push(storageTarefa);
        localStorage.setItem('storageTarefa', JSON.stringify(minhasTarefas));

        const el_tarefa = document.createElement("div");
        el_tarefa.classList.add("tarefa");
        const conteudo_tarefa = document.createElement("div");
        conteudo_tarefa.classList.add("conteudo");
        el_tarefa.appendChild(conteudo_tarefa);

        const input_tarefa = document.createElement("input");
        input_tarefa.classList.add("texto");
        input_tarefa.type = "text"
        input_tarefa.value = tarefa;
        input_tarefa.setAttribute("readonly", "readonly");

        conteudo_tarefa.appendChild(input_tarefa);
        const acoes_tarefa = document.createElement('div');
        acoes_tarefa.classList.add("acoes");

        const delete_tarefa = document.createElement('button');
        delete_tarefa.classList.add("deletar");
        delete_tarefa.innerText = "Apagar";

        el_lista.appendChild(el_tarefa);

        input.value = '';
    }, 2000);
});


el_lista.addEventListener("click", (e) => {
    minhasTarefas.forEach((element, i) => {
        if (e.target.value === element.item) {
            if (element.status === "não feito") {
                element.status = "feito";
                localStorage.setItem('storageTarefa', JSON.stringify(minhasTarefas));
            } else if (element.status === "feito") {
                element.status = "não feito";
                localStorage.setItem('storageTarefa', JSON.stringify(minhasTarefas));
            }
        }
        location.reload();
    });
});

renderizarStorage();







