class Task {
  constructor(name, id, date) {
    this.name = name
    this.id = id
    this.date = date
    this.status = 'A fazer'
  }
}

let btnAddTask = document.querySelector('#addTask')
let btnDeleteTask = document.querySelector('#deleteTask')
let taskList = localStorage.getItem('tasks')

if (taskList != null) {
  taskList = JSON.parse(taskList)
  tableContent = ''
  taskList.forEach((task) => {
    tableContent += `
      <tr class='table-content'>
        <td class='name' id='${task.id}'>${task.name}</td>
        <td class='status' id='to-do'>${task.status}</td>
        <td class='date'>${task.date}</td>
        <td class='deletion'><button id='deleteTask'>Delete</button></td>
      </tr>`
  })
  tableBody = document.querySelector('.table-body')
  tableBody.innerHTML = tableContent // Explicar o motivo do uso do innerHTML no READ-ME
  tableBody.querySelectorAll('tr').forEach((tableRow) => {
    addEvListeners(tableRow.querySelector('.name'),
                   tableRow.querySelector('.status'),
                   tableRow.querySelector('#deleteTask'),
                   tableRow)
  })
} else {
  taskList = []
}

btnAddTask.addEventListener('click', () => {
  let task = document.querySelector('#task')
  let date = document.querySelector('#date')
  addTask(task, date)
})

function addTask(task, date) {
  let taskID = taskList.length
  let newTask = new Task(task.value, taskID, date.value)
  let tableBody = document.querySelector('.table-body')
  let tableRow = createTaskRow(newTask)

  if (taskList.length == 0) {
    setTimeout(() => {
      tableBody.replaceChild(tableRow, tableBody.firstElementChild)
    }, 2000);
  } else {
    setTimeout(() => {
      tableBody.appendChild(tableRow)
    }, 2000);
  }
  taskList.push(newTask)
  localStorage.setItem('tasks', JSON.stringify(taskList))
}

function createTaskRow(task) {
  let tableRow = document.createElement('tr') // Explicar o motivo do uso do createElement() no READ-ME
  tableRow.className = 'table-content'

  let tableDataText = document.createElement('td')
  tableDataText.className = 'name'
  tableDataText.id = task.id
  let taskText = document.createTextNode(task.name)
  tableDataText.appendChild(taskText)

  let tableDataStatus = document.createElement('td')
  tableDataStatus.className = 'status'
  let taskStatus = document.createTextNode(task.status)
  tableDataStatus.appendChild(taskStatus)
  if (task.status === 'A fazer') { // explicar no read-me que pega a referência da task e ñ cria direto pra evitar problemas
    tableDataStatus.id = 'to-do'
  } else if (task.status === 'Feito') {
    tableDataStatus.id = 'done'
  }

  let tableDate = document.createElement('td')
  tableDate.className = 'date'
  let taskDate = document.createTextNode(task.date)
  tableDate.appendChild(taskDate)

  let tableDataDelete = document.createElement('td')
  tableDataDelete.className = 'deletion'
  let deleteButton = document.createElement('button')
  deleteButton.id = 'deleteTask'
  let deleteText = document.createTextNode('Deletar')
  deleteButton.appendChild(deleteText)
  tableDataDelete.appendChild(deleteButton)

  tableRow.appendChild(tableDataText)
  tableRow.appendChild(tableDataStatus)
  tableRow.appendChild(tableDate)
  tableRow.appendChild(tableDataDelete)
  
  addEvListeners(tableDataText, tableDataStatus, deleteButton, tableRow)

  return tableRow
}

// READ-ME: foi feita uma função para adicionar os Ev. List. pois é usado tanto no createTaskRow() quanto ao recarregar a página
function addEvListeners(taskDescription, taskStatus, deleteBtn, tableRow) {
  taskDescription.addEventListener('click', () => {
    changeStatus(tableRow)
  })
  taskStatus.addEventListener('click', () => {
    changeStatus(tableRow)
  })
  deleteBtn.addEventListener('click', () => {
    deleteTask(tableRow)
  })
}

function changeStatus(tableRow) {
  taskStatus = tableRow.querySelector('.status')
  taskPos = tableRow.querySelector('.name').id

  if (taskStatus.id === 'to-do') {
    taskList[taskPos].status = 'Feito'
    taskStatus.textContent = 'Feito'
    taskStatus.id = 'done'
  } else if (taskStatus.id === 'done') {
    taskList[taskPos].status = 'A fazer'
    taskStatus.textContent = 'A fazer'
    taskStatus.id = 'to-do'
  }
  localStorage.setItem('tasks', JSON.stringify(taskList))
}

function deleteTask(task) {
  removedTask = task.querySelector('.name')
  taskList.splice(removedTask.id, 1)
  rowsList = document.querySelector('.table-body').querySelectorAll('tr')
  removedTaskId = removedTask.id

  for (let i = removedTaskId; i < taskList.length; i++) {
    taskList[i].id = i
  }
  rowsList.forEach((row) => {
    rowName = row.querySelector('.name')
    if (rowName.id > removedTaskId) {
      rowName.id--
    }
  })
  document.querySelector('.table-body').removeChild(removedTask.parentElement)
  localStorage.setItem('tasks', JSON.stringify(taskList))

  if (taskList.length == 0) {
    localStorage.removeItem('tasks')
    document.querySelector('.table-body').innerHTML = `
      <tr class="table-content">
        <td colspan="3">Não existem tarefas registradas!</td>
      </tr>`
  }
}