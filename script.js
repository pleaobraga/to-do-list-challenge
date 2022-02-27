buscarItensDaLocalStorage()
adicionarComEnter()

const timeOut = () => { 
    setTimeout( adicionarTarefaNova, 2000)
}

const botaoAdd = document.querySelector('.botaoTarefa')
botaoAdd.addEventListener('click', timeOut)

function adicionarComEnter() {
    let input = document.querySelector('.inputTarefa')
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) { document.querySelector('.botaoTarefa').click(); }
    })
}

function listenerBotaoExcluir() {
    const botaoExcluir = document.querySelectorAll('.botao1')
    botaoExcluir.forEach(element => {element.addEventListener('click', excluirTarefa) }) 
}

function excluirTarefa(event) {
    event.target.parentNode.parentNode.parentNode.remove() 
}

let indexDoLi = 0;

function adicionarTarefaNova() {
    let tarefaInput = document.querySelector('#novaTarefa').value
    if(tarefaInput != ""){
        let novoLi = document.createElement("li")
        novoLi.setAttribute("id", `item${indexDoLi}`)
        novoLi.classList.add("itemLista")

        let lista = document.querySelector('#listaDeTarefas')
        lista.appendChild(novoLi)

        let novoDivTexto = document.createElement("div")
        novoDivTexto.innerText = tarefaInput
        novoDivTexto.classList.add("divTexto")

        let novoDivBotoes = document.createElement("div")
        novoDivBotoes.classList.add("divBotoes")

        let novoBotao = document.createElement("button")
        novoBotao.classList.add("botao1")
        
        let novoIcone = document.createElement('img')
        novoIcone.setAttribute("src", "imgs/iconeLixeira.png")
        novoIcone.classList.add("iconeDeletar")

        novoBotao.appendChild(novoIcone)

        lista.lastChild.appendChild(novoDivTexto)
        lista.lastChild.appendChild(novoDivBotoes)
        lista.lastChild.lastChild.appendChild(novoBotao)

        lista.addEventListener('click', toggleStatus)

        document.querySelector('#novaTarefa').value = ''
        armazenarListaNoLocalStorage()
        indexDoLi++;
        listenerBotaoExcluir();
    }
}

function toggleStatus(event) {
    if(event.target.tagName != 'UI'){
        if ( event.target.tagName == 'LI') {event.target.childNodes[0].classList.toggle('striked-text')
        } else if (event.target.tagName == 'DIV') { event.target.classList.toggle('striked-text') }
        armazenarListaNoLocalStorage()
    }    
}

function armazenarListaNoLocalStorage() {
    let itens = document.querySelectorAll("#listaDeTarefas li")

    let arrayText = Array.prototype.map.call(itens, function(item) { return item.textContent })
    localStorage.setItem("lista", JSON.stringify(arrayText))

    let arrayStatus = Array.prototype.map.call(itens, function(item) { return item.classList.value })
    localStorage.setItem("classList", JSON.stringify(arrayStatus))
    
    let indexText = Array.prototype.map.call(itens, function(item){ return item.getAttribute("id") })
    localStorage.setItem("listaIndex", JSON.stringify(indexText))

    let div1ClassList = Array.prototype.map.call(itens, function(item){ return item.childNodes[0].classList.value })
    localStorage.setItem("div1ClassList", JSON.stringify(div1ClassList))

    let div2ClassList = Array.prototype.map.call(itens, function(item){ return item.childNodes[1].classList.value })
    localStorage.setItem("div2ClassList", JSON.stringify(div2ClassList))

    let botoes = document.querySelectorAll("#listaDeTarefas li div button")
    
    let botaoExcluirClassList = Array.prototype.map.call(botoes, function(item){ return item.classList.value })
    localStorage.setItem("botaoExcluirClassList", JSON.stringify(botaoExcluirClassList))

    let botaoExcluirImgSrc = Array.prototype.map.call(botoes, function(item){ return item.childNodes[0].getAttribute("src") })
    localStorage.setItem("botaoExcluirImgSrc", JSON.stringify(botaoExcluirImgSrc))

    let botaoExcluirImgClass = Array.prototype.map.call(botoes, function(item){ return item.childNodes[0].classList.value })
    localStorage.setItem("botaoExcluirImgClass", JSON.stringify(botaoExcluirImgClass))

}

function criarItemNaLista(text) {
    let ul = document.querySelector("#listaDeTarefas")
    let li = document.createElement("li")
    let div1 = document.createElement("div")
    let div2 = document.createElement("div")
    let botaoExcluir = document.createElement("button")
    let imgExcluir = document.createElement("img")
    li.appendChild(div1)
    li.appendChild(div2)
    div2.appendChild(botaoExcluir)
    botaoExcluir.appendChild(imgExcluir)
    div1.innerText = text;

    ul.appendChild(li)
    ul.addEventListener('click', toggleStatus)
}

function buscarItensDaLocalStorage() {
    savedLista = JSON.parse(localStorage.getItem("lista"));
    savedArray = JSON.parse(localStorage.getItem("classList"))
    savedIndex = JSON.parse(localStorage.getItem("listaIndex"))
    savedDiv1ClassList = JSON.parse(localStorage.getItem("div1ClassList"))
    savedDiv2ClassList = JSON.parse(localStorage.getItem("div2ClassList"))
    savedBotaoExcluirClassList = JSON.parse(localStorage.getItem("botaoExcluirClassList"))
    savedBotaoExcluirImgClass = JSON.parse(localStorage.getItem("botaoExcluirImgClass"))
    savedBotaoExcluirImgSrc = JSON.parse(localStorage.getItem("botaoExcluirImgSrc"))

    if(savedLista){
        for (i = 0; i < savedLista.length; i++){
            criarItemNaLista(savedLista[i])
            
            if(savedArray[i] != ""){ document.querySelector("#listaDeTarefas").lastChild.classList.add(savedArray[i]) }
            
            if(savedIndex != ""){ document.querySelector("#listaDeTarefas").lastChild.setAttribute("id", savedIndex[i]) }

            let novoDiv1 = document.querySelector(`#${savedIndex[i]}`).childNodes[0]
            let div1ClassNames = savedDiv1ClassList[i]
            if(savedDiv1ClassList!=""){ novoDiv1.classList.add.apply(novoDiv1.classList, div1ClassNames.split(" ")) }

            let novoDiv2 = document.querySelector(`#${savedIndex[i]}`).childNodes[1]
            let div2ClassNames = savedDiv2ClassList[i]
            if(savedDiv2ClassList!=""){ novoDiv2.classList.add.apply(novoDiv2.classList, div2ClassNames.split(" ")) }

            let botao1 = novoDiv2.childNodes[0]
            botao1.classList.add(savedBotaoExcluirClassList[i])

            let imgBotao = botao1.childNodes[0]
            imgBotao.classList.add(savedBotaoExcluirImgClass[i])
            imgBotao.setAttribute('src', savedBotaoExcluirImgSrc[i])
        }
    }
    listenerBotaoExcluir()
}