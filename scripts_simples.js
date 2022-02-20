class Task {
    constructor(id, description, observation, date, createdAt, updatedAt){
        id=parseInt(id)
        this.id=id
        this.description=description,
        this.observation=observation,
        this.date=date,
        this.createdAt=createdAt,
        this.updatedAt=updatedAt,
        this.done=false
    }
}

const STORAGE = {
    get(){
        return JSON.parse(localStorage.getItem("todo-list:tasks")) || []
    },
    set(tasks){
        localStorage.setItem("todo-list:tasks", JSON.stringify(tasks))
    }
}

const TASK = {
    tasks: STORAGE.get(),

    createTask() {
        const id=this.createID()
        const description= HTML.description.value
        const date= HTML.date.value
        const newTask= new Task(id, description, date)    
        this.tasks.push(newTask)
        STORAGE.set(this.tasks)
        start()
    },
    
    editTask(id) {
        HTML.buttonsConfig("edit")
        const selectedTask=this.catchTask(id)
        HTML.formValues(selectedTask)  
    },
    
    saveTask() {     
        const id=HTML.id.value
        const description= HTML.description.value
        const updatedTask= new Task(id, nome)        
        const selectedTask=this.catchTask(id)
        const index=this.tasks.indexOf(selectedTask)
        this.tasks.splice(index, 1, updatedTask)
        STORAGE.set(this.tasks)
        HTML.clearForm()
        HTML.buttonsConfig("add")
        start()
    },
    
    deleteTask(id) {
        const selectedTask=this.catchTask(id)
        index=this.tasks.indexOf(selectedTask)
        this.tasks.splice(index, 1)
        STORAGE.set(this.tasks)    
    },

    createID() {
        const lengthTasks = this.tasks.length
        if (lengthTasks==0){
            return 1
        }
        else{
            index=lengthTasks-1
            lastTask=this.tasks[index]
            idlastTask=lastTask.id
            return idlastTask+1
        }
    },
    
    catchTask(id) {
        return this.tasks.find(task => task.id == id)
    },

    deleteAllTasks(){
        STORAGE.set([])        
        this.tasks=STORAGE.get()
        start()
    }
}

const HTML = {
    id: document.querySelector('input#id'),
    description: document.querySelector('input#description'),
    date: document.querySelector('input#date'),
    table: document.querySelector('table.pure-table tbody'),
    submit: document.querySelector('button#submit'),
    cancel: document.querySelector('button#cancel'),

    clearTable() {
        this.table.innerHTML=''
    },
    
    clearForm() {
        this.id.value=''
        this.description.value=''
    },

    buttonsConfig(momentType){
        if (momentType==="add"){
            this.submit.innerHTML='Adicionar'
            this.cancel.innerHTML='Limpar'
        }
        else if (momentType==="edit"){
            this.submit.innerHTML='Salvar'
            this.cancel.innerHTML='Cancelar'
        }
    },

    addElements(){
        const tasks = STORAGE.get()
        this.clearTable()    
        console.log(tasks)
        if (tasks.length > 0) {
            tasks.forEach(task => {
                const row = document.createElement('tr')
                row.innerHTML=`
                    <td>${task.id}</td>
                    <td>${task.description}</td>
                    <td>
                        <a href="#" class="comando-contato editar" onclick="TASK.editTask(${task.id})">&#128393;</a>
                        <a href="#" class="comando-contato excluir" onclick="TASK.deleteTask(${task.id})">&#128465;</a>
                    </td>
                `
                this.table.appendChild(row)
            });
        }
        else{
            const row = document.createElement('tr')
            row.innerHTML=`
              <td colspan="4">Não existem dados registrados!</td>
            `
            this.table.appendChild(row)
        }
    },

    formValues(task){
        this.id.value=task.id
        this.description.value=task.description
    },

    buttonSubmit(){
        if (this.id.value===''){
            TASK.createTask()
            this.clearForm()
        }
        else{
            TASK.saveTask()
        }
    },

    buttonCancel(){
        if (this.id.value===''){
            this.clearForm()
        }
        else{            
            this.clearForm()
            this.buttonsConfig('add')
        }
    }
}

function start(){
    HTML.addElements()
}

start()