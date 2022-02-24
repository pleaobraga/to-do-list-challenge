class Task {
  constructor(name, id, date) {
    this.name = name
    this.id = id
    this.date = date
    this.statusText = 'A fazer'
    this.statusID = 'to-do'
  }
}

let btnAddTask = document.querySelector('#addTask')
let btnDeleteTask = document.querySelector('#deleteTask')
let taskList = localStorage.getItem('tasks')

if (taskList != null) {
  taskList = JSON.parse(taskList)
  let tableContent = ''
  taskList.forEach((task) => {
    tableContent += `
    <tr class='table-content'>
    <td class='td-name' id='${task.id}'>${task.name}</td>
    <td class='td-status' id='${task.statusID}'>${task.statusText}</td>
    <td class='td-date'>${task.date}</td>
    <td class='td-deletion'><button id='deleteTask'>Deletar</button></td>
    </tr>`
  })
  let tableBody = document.querySelector('.table-body')
  tableBody.innerHTML = tableContent
  tableBody.querySelectorAll('tr').forEach((tableRow) => {
    addEvListeners(tableRow.querySelector('.td-name'),
                   tableRow.querySelector('.td-status'),
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
  let tableRow = document.createElement('tr')
  tableRow.className = 'table-content'

  let tableDataText = document.createElement('td')
  tableDataText.className = 'td-name'
  tableDataText.id = task.id
  let taskText = document.createTextNode(task.name)
  tableDataText.appendChild(taskText)

  let tableDataStatus = document.createElement('td')
  tableDataStatus.className = 'td-status'
  let taskStatus = document.createTextNode(task.statusText)
  tableDataStatus.appendChild(taskStatus)
  if (task.statusText == 'A fazer') {
    tableDataStatus.id = 'to-do'
  } else if (task.statusText == 'Feito') {
    tableDataStatus.id = 'done'
  }

  let tableDate = document.createElement('td')
  tableDate.className = 'td-date'
  let taskDate = document.createTextNode(task.date)
  tableDate.appendChild(taskDate)

  let tableDataDelete = document.createElement('td')
  tableDataDelete.className = 'td-deletion'
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
  let taskStatus = tableRow.querySelector('.td-status')
  let taskPos = tableRow.querySelector('.td-name').id

  if (taskStatus.id === 'to-do') {
    taskList[taskPos].statusText = 'Feito'
    taskList[taskPos].statusID = 'done'
    taskStatus.textContent = 'Feito'
    taskStatus.id = 'done'

  } else if (taskStatus.id === 'done') {
    taskList[taskPos].statusText = 'A fazer'
    taskList[taskPos].statusID = 'to-do'
    taskStatus.textContent = 'A fazer'
    taskStatus.id = 'to-do'
  }
  localStorage.setItem('tasks', JSON.stringify(taskList))
}

function deleteTask(task) {
  let tableBody = document.querySelector('.table-body')
  let removedTaskId = parseInt(task.querySelector('.td-name').id)
  taskList.splice(removedTaskId, 1)
  rowsList = tableBody.querySelectorAll('tr')

  for (let i = removedTaskId; i < taskList.length; i++) {
    taskList[i].id = i
  }
  rowsList.forEach((row) => {
    rowName = row.querySelector('.td-name')
    if (rowName.id > removedTaskId) {
      rowName.id--
    }
  })
  tableBody.removeChild(task)
  localStorage.setItem('tasks', JSON.stringify(taskList))

  if (taskList.length == 0) {
    localStorage.removeItem('tasks')
    tableBody.innerHTML = `
      <tr class="table-content">
        <td class="td-initial" colspan="3">Não existem tarefas registradas!</td>
      </tr>`
  }
}
