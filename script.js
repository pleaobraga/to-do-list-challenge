const tarefa = document.querySelector('#task')
const tabela = document.querySelector('#toDo-list')
const botaoAdicionarTarefa = document.querySelector('#add-task')

function remove() {
  let remover = document.getElementsByClassName('remove')

  for (elem of remover) {
    elem.addEventListener('click', element => {
      element.target.parentNode.parentNode.remove()
    })
  }
}

function adicionarTarefa() {
  setTimeout(() => {
    if (!tarefa.value == '') {
      let linhaTabela = document.createElement('tr')
      let colunaTarefa = document.createElement('td')
      let colunaRemover = document.createElement('td')
      let itemLista = document.createElement('li')
      let botaoRemover = document.createElement('button')
      botaoRemover.className = 'remove'
      let valorDoImput = tarefa.value
      itemLista.innerText = `${valorDoImput} `
      botaoRemover.innerText = 'Remover'
      tabela.insertAdjacentElement('beforeend', linhaTabela)
      linhaTabela.insertAdjacentElement('beforeend', colunaTarefa)
      linhaTabela.insertAdjacentElement('beforeend', colunaRemover)
      colunaTarefa.insertAdjacentElement('beforeend', itemLista)
      colunaRemover.insertAdjacentElement('beforeend', botaoRemover)
      tarefa.value = ''
    }

    remove()

    localStorage.setItem('table', tabela.innerHTML)
  }, 2000)
}

botaoAdicionarTarefa.addEventListener('click', adicionarTarefa)

tabela.addEventListener('click', element => {
  if (element.target.className == 'done') {
    element.target.classList.remove('done')
    localStorage.setItem('table', tabela.innerHTML)
  } else {
    element.target.classList = 'done'
    localStorage.setItem('table', tabela.innerHTML)
  }
})

tabela.innerHTML = localStorage.getItem('table')

remove()
