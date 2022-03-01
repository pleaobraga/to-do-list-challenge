const taskInput = document.querySelector(".task-input input")
filters = document.querySelectorAll('.filters span')
clearAll = document.querySelector('.clear-btn')
taskBox = document.querySelector('.task-box')
const btnTask = document.querySelector('.add-task')
const pendingTask = document.getElementById('pending')
const completedTask = document.getElementById('completed')
const allTask = document.getElementById('all')

let editId
let isEditedTask = false
let todos = JSON.parse(localStorage.getItem('todo-list'))

filters.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('span.active').classList.remove('active')
        btn.classList.add('active')
        showTodo(btn.id)
    })
})

function showTodo(filter) {
    let li = ''
    if (todos) {
        todos.forEach((todo, id) => {
            let isCompleted = todo.status == 'completed' ? 'checked' : ''
            if (filter == todo.status || filter == 'all') {
                li += `<li class="task">
                    <label for="${id}">
                        <input onclick='updateStatus(this)' type="checkbox" id="${id}" ${isCompleted}>
                        <p class="${isCompleted}" >${todo.name}</p>
                    </label>
                    <div class="settings">
                        <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                         <ul class="task-menu">
                            <li onclick="editTask(${id}, '${todo.name}')">
                            <i class="uil uil-pen">
                            </i>Editar</li>
                            <li onclick="deleteTask(${id})" >
                            <i class="uil uil-trash"></i>Deletar</li>
                        </ul>
                    </div>`
            }
        })
    }
    taskBox.innerHTML = li || `<span>Você não possui tarefas nessa seção.</span>`
}

showTodo('all')

function showMenu(selectedTask) {
    let taskMenu = selectedTask.parentElement.lastElementChild
    taskMenu.classList.add('show')
    document.addEventListener('click', (event) => {
        if (event.target.tagName != 'I' || event.target != selectedTask) {
            taskMenu.classList.remove('show')
        }
    })
}

function editTask(taskId, taskName) {
    editId = taskId
    isEditedTask = true
    taskInput.value = taskName
}

function deleteTask(deleteId) {
    if (completedTask.classList == 'active') {
        todos.splice(deleteId, 1)
        localStorage.setItem('todo-list', JSON.stringify(todos))
        showTodo('completed')
    } else if (pendingTask.classList == 'active') {
        todos.splice(deleteId, 1)
        localStorage.setItem('todo-list', JSON.stringify(todos))
        showTodo('pending')
    } else if (allTask) {
        todos.splice(deleteId, 1)
        localStorage.setItem('todo-list', JSON.stringify(todos))
        showTodo('all')
    }

}

clearAll.addEventListener('click', () => {
    todos.splice(0, todos.length)
    localStorage.setItem('todo-list', JSON.stringify(todos))
    showTodo('all')
})

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild
    if (selectedTask.checked) {
        taskName.classList.add('checked')
        todos[selectedTask.id].status = 'completed'
    } else {
        taskName.classList.remove('checked')
        todos[selectedTask.id].status = 'pending'
    }
    localStorage.setItem('todo-list', JSON.stringify(todos))
}

taskInput.addEventListener("keyup", (event) => {
    let userTask = taskInput.value.trim()
    setTimeout(() => {
        if (event.key === "Enter" && userTask) {
            if (!isEditedTask) {
                if (!todos) {
                    todos = []
                }
                let taskInfo = { name: userTask, status: 'pending' }
                todos.push(taskInfo)
            } else {
                isEditedTask = false
                todos[editId].name = userTask
            }
            taskInput.value = ''
            localStorage.setItem('todo-list', JSON.stringify(todos))
            showTodo('all')
        }
    }, 2000)
})

btnTask.onclick = () => {
    let userTask = taskInput.value.trim()
    setTimeout(() => {
        if (userTask !== '') {
            if (!isEditedTask) {
                if (!todos) {
                    todos = []
                }
                let taskInfo = { name: userTask, status: 'pending' }
                todos.push(taskInfo)
            } else {
                isEditedTask = false
                todos[editId].name = userTask
            }
        }

        taskInput.value = ''
        localStorage.setItem('todo-list', JSON.stringify(todos))
        showTodo('all')

    }, 2000)
}
