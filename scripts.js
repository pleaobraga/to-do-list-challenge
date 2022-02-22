class Task {
    constructor(id, repetition, description, date, observation, createdAt, updatedAt, done){  
        id=parseInt(id)
        this.id=id
        this.repetition=repetition
        this.description=description,
        this.date=date,
        this.observation=observation,
        this.createdAt=createdAt,
        this.updatedAt=updatedAt,
        this.done=done
    }
}

const MODAL = {
    open(formHtml, formDo, optional){
        this.closeForms()
        FORM.clearFields()
        if (formHtml==='task'){
            FORM.configFields(formHtml, formDo, optional)
            FORM.valueFields(formHtml, formDo, optional)
            HTML.modalOverlay.addEventListener('click', evt => this.closeInClick(evt))
            HTML.modalTask.classList.add('active')
        }
        HTML.modalOverlay.classList.add('active')
    },

    closeOverlay(){
        HTML.modalOverlay.classList.remove('active')
        this.closeForms()
    },

    closeForms(){
        HTML.modals.forEach(form => {
            form.classList.remove('active')
        });
    },

    closeInClick(event){
        if (event.target === HTML.modalOverlay){
            this.closeOverlay();
        }
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

const SESSIONSTORAGE = {
    get(value){
        return JSON.parse(sessionStorage.getItem("todo-list:"+value)) || []
    },
    set(value, data){
        sessionStorage.setItem("todo-list:"+value, JSON.stringify(data))
    }
}

const TASK = {
    tasks: STORAGE.get(),

    createTask(formValues) {
        const id=this.createID()
        const repetition=formValues.repetition
        const description= formValues.description
        const date= formValues.date
        const observation=formValues.observation
        const createdAt= UTILS.formatSystemDateToStringSystemDate(new Date)
        const updatedAt= UTILS.formatSystemDateToStringSystemDate(new Date)
        const done=false

        const newTask= new Task(id, repetition, description, date, observation, createdAt, updatedAt, done)    
        this.tasks.push(newTask)
        STORAGE.set(this.tasks)
    },
    
    viewTask(id) {
        const selectedTask=this.catchTask(id)
        MODAL.open('task', 'view', selectedTask)
    },
    
    editTask(id) {
        const selectedTask=this.catchTask(id)
        MODAL.open('task', 'edit', selectedTask)
    },
    
    saveTask(formValues) {     
        const selectedTask=this.catchTask(formValues.id)
        const index=this.tasks.indexOf(selectedTask)
        let updatedTask=selectedTask
        updatedTask.description= formValues.description
        updatedTask.date= formValues.date
        updatedTask.observation=formValues.observation
        updatedTask.updatedAt= UTILS.formatSystemDateToStringSystemDate(new Date)
        this.tasks.splice(index, 1, updatedTask)
        STORAGE.set(this.tasks)
    },
    
    deleteTask(id) {
        const selectedTask=this.catchTask(id)
        index=this.tasks.indexOf(selectedTask)
        this.tasks.splice(index, 1)
        STORAGE.set(this.tasks)
        start(false)
    },
    
    changeDoneTask(id) {
        const selectedTask=this.catchTask(id)
        const index=this.tasks.indexOf(selectedTask)
        let updatedTask=selectedTask
        updatedTask.done=!selectedTask.done
        updatedTask.updatedAt= UTILS.formatSystemDateToStringSystemDate(new Date)
        this.tasks.splice(index, 1, updatedTask)
        STORAGE.set(this.tasks)
        start(false)
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

    tratamentToShow(){
        tratedTasks=[]
        this.tasks.forEach(task => {
            newTask = {
                "id": task.id,
                "status": UTILS.checkStatus(task),
                "description": task.description,
                "date": task.date
            }
            tratedTasks.push(newTask)            
        });
        return tratedTasks;
    }
}

const HTML = {
    modalOverlay: document.querySelector('div.modal-overlay'),
    modalTask: document.querySelector('div.modal.tasks'),
    modalFilter: document.querySelector('div.modal.filter'), //filter
    modals: document.querySelectorAll('div.modal'),
    tbodyTasks: document.querySelector('tbody.tbody-tasks'),
    cardArrearsCount: document.querySelector('p#cardArrearsCount'),
    cardWarningCount: document.querySelector('p#cardWarningCount'),
    cardPendingCount: document.querySelector('p#cardPendingCount'),

    clearTaskTable() {
        this.tbodyTasks.innerHTML=''
    },

    addTdsToTr(category, status, text) {
        const td = document.createElement('td')
        td.classList.add("td-tasks")
        td.classList.add(category)
        td.classList.add(status)
        td.innerText=text
        return td
    },

    addTdCommandToTr(category, task) {
        const td = document.createElement('td')
        td.classList.add("td-tasks")
        td.classList.add(category)

        td.appendChild(this.addSpanToTdCommand("view", task, "👁"))
        td.appendChild(this.addSpanToTdCommand("edit", task, "🖉"))
        td.appendChild(this.addSpanToTdCommand("delete", task, "🗑"))
        let text=""
        if(task.done){
            text="x"
        }
        else{
            text="✓"
        }
        td.appendChild(this.addSpanToTdCommand("changeDone", task, text))
        return td
    },

    addSpanToTdCommand(todo, task, text){
        const span = document.createElement('span')
        span.setAttribute("id", todo+"_"+task.id);
        span.innerText=text
        return span
    },

    webElements(){
        const tasks = FILTER.apply()['toShow']
        //FILTER TO COUNT
        this.clearTaskTable()
        if (tasks.length > 0) {
            let counter = {
                "arrears": 0,
                "warning": 0,
                "pending": 0
            }
            tasks.forEach(task => {
                const status=UTILS.checkStatus(task)
                counter=UTILS.updateCounter(counter, status)

                const tr = document.createElement('tr')
                tr.classList.add("tr-tasks")
                tr.appendChild(this.addTdsToTr("status", status, "⬤"))
                tr.appendChild(this.addTdsToTr("description", status, task.description))
                tr.appendChild(this.addTdsToTr("date", status, UTILS.formatDateToDisplay(task.date)))
                tr.appendChild(this.addTdCommandToTr("commands", task))
                this.tbodyTasks.appendChild(tr)
                
            });
            this.cardArrearsCount.innerText=counter['arrears']
            this.cardWarningCount.innerText=counter['warning']
            this.cardPendingCount.innerText=counter['pending']
        }
    },

    addLinksAddTask(){
        const ul = document.querySelector('ul#menuTask');
        ul.addEventListener('click', evt => MODAL.open('task', evt.target.id, evt.target.id));
    },

    addLinksButtonsInTable(){
        const trs = document.querySelectorAll('.tr-tasks');
        trs.forEach(tr => {
            const td = tr.querySelectorAll('td')[3]
            td.addEventListener('click', evt => UTILS.checkHTMLOrder(evt.target.id));
        });
    }
}

const FILTER = {
    filter: SESSIONSTORAGE.get("filter"),

    start(){
        const filter={
            // 'startDate': '',
            // 'finalDate': '',
            'itensPerPage': 5,
            'page': 1,
            // 'codOrder': 0,
            // 'order': ''
        }
        SESSIONSTORAGE.set("filter", filter)
    },

    apply(){
        const tasks= TASK.tratamentToShow()
        lenTasks=tasks.length()
        pages=Math.ceil(lenTasks/this.filter['itensPerPage'])
        const firstItem=(filter['page']-1)*15
        const lastItem=(filter['page']-1)*15
        return {"toCount": tasks, "toShow": tasks.slice(firstItem, lastItem)}
    }

}

const FORM = {
    id: document.querySelector('input#task_id'),
    do: document.querySelector('input#task_do'),
    repetition: document.querySelector('input#task_repetition'),
    description: document.querySelector('input#task_description'),
    date: document.querySelector('input#task_date'),
    observation: document.querySelector('textarea#task_observation'),
    btnSubmit: document.querySelector('.input-group.actions button'),
    btnCancel: document.querySelector('.button.cancel'),

    getValues(form){
        if (form=='task'){
            return {
                id: this.id.value,
                repetition: this.repetition.value,
                description: this.description.value,
                date: this.date.value,
                observation: this.observation.value
            }
        }
    },

    validateFields(form) {
        if (form=='task'){
            const formValues = this.getValues(form)    
            if( formValues.repetition.trim() === "" || 
                formValues.description.trim() === "" || 
                formValues.date.trim() === "") 
            {
                throw new Error("Por favor, preencha os campos repetição, descrição e data.")
            }
            else{
                return formValues;
            }
        }
    },

    clearFields() {
        this.id.value = ""
        this.repetition.value = ""
        this.description.value = ""
        this.date.value = ""
        this.observation.value = ""
    },

    configFields(formHtml, formDo, optional) {  
        if (formHtml==="task"){
            if (formDo==="simple" || formDo==="week" || formDo==="month"){
                if(formDo==="simple"){
                    this.repetition.readOnly = true;
                    this.repetition.min=String(1);
                }
                else{
                    this.repetition.readOnly = false;
                    this.repetition.min=String(2);
                }
                this.description.readOnly=false
                this.date.readOnly=false
                this.observation.readOnly=false
                this.btnSubmit.hidden=false
            }
            else if(formDo==="edit"){
                this.repetition.readOnly = true;
                this.repetition.min=String(1);
                this.description.readOnly=false
                this.date.readOnly=false
                this.observation.readOnly=false
                this.btnSubmit.hidden=false
            }
            else if(formDo==="view"){
                this.repetition.readOnly=true
                this.repetition.min=String(1);
                this.description.readOnly=true
                this.date.readOnly=true
                this.observation.readOnly=true
                this.btnSubmit.hidden=true
            }
        }

    },

    valueFields(formHtml, formDo, optional) {
        if (formHtml==="task"){
            this.do.value=formDo
            if (formDo==="simple" || formDo==="week" || formDo==="month"){                
                if(formDo==="simple"){
                    this.repetition.value = String(1);
                }
                else{
                    this.repetition.value = String(2);
                }
                this.btnSubmit.innerText="Criar"
                this.btnCancel.innerText="Cancelar"
            }
            else{          
                if(formDo==="edit"){
                    this.btnSubmit.innerText="Salvar"
                    this.btnCancel.innerText="Cancelar"
                }          
                if(formDo==="view"){
                    this.btnCancel.innerText="Fechar"
                } 
                this.id.value=optional.id
                this.repetition.value=optional.repetition
                this.description.value=optional.description
                this.date.value=optional.date
                this.observation.value=optional.observation
            }
        }
    },
    
    buttonSubmit(event, form){
        event.preventDefault()
        try {
            const formValues = this.validateFields(form)
            MODAL.closeOverlay()
            if (form=='task'){
                if (this.do.value==="simple"){
                    TASK.createTask(formValues)
                }
                else if (this.do.value==="week" || this.do.value==="month"){
                    let repetition=0
                    const maxPeriod=parseInt(formValues.repetition)
                    const originalDate=formValues.date
                    while (repetition<maxPeriod){
                        let formToCreate=formValues
                        formToCreate.date=UTILS.calculatePeriod(originalDate, this.do.value, repetition)
                        TASK.createTask(formToCreate)                        
                        repetition=repetition+1
                    }
                }
                else if(this.do.value=='edit'){
                    TASK.saveTask(formValues)
                }
            }
            start(false)
        } catch (error) {
            alert(error.message)
        }
    }
}

const UTILS = {
    formatSystemDateToStringSystemDate(date){
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return year+"-"+month+"-"+day
    },

    extractOnlyDate(date){
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth()).padStart(2, '0');
        const year = date.getFullYear();
        return new Date(year, month, day)
    },
    
    checkStatus(task){
        const done=task.done

        const todayDate=new Date()
        const tomorrowDate=new Date()
        tomorrowDate.setDate(tomorrowDate.getDate()+1)
        
        const taskDateInParts=task.date.split("-")
        const taskDateDate=new Date(taskDateInParts[0], taskDateInParts[1]-1, taskDateInParts[2])

        today=this.formatSystemDateToStringSystemDate(todayDate)
        tomorrow=this.formatSystemDateToStringSystemDate(tomorrowDate)
        taskDate=this.formatSystemDateToStringSystemDate(taskDateDate)
        
        if (done){
            return "done"
        }
        else if (taskDate<today){
            return "arrears"
        }
        else if (taskDate==today || taskDate==tomorrow){
            return "warning"
        }
        else {
            return "pending"
        }
    },
    
    checkHTMLOrder(idElement){
        const infoElement=idElement.split("_")
        idTask=parseInt(infoElement[1])
        if (infoElement[0]=="view"){
            TASK.viewTask(idTask)
        }
        else if (infoElement[0]=="edit"){
            TASK.editTask(idTask)
        }
        else if (infoElement[0]=="delete"){
            TASK.deleteTask(idTask)
        }
        else if (infoElement[0]=="changeDone"){
            TASK.changeDoneTask(idTask)
        }
    },

    updateCounter(counter, status){
        if (status == "arrears"){
            counter["arrears"]= counter["arrears"]+1
        }
        else if (status == "warning"){
            counter["warning"]= counter["warning"]+1
        }
        else if (status == "pending"){
            counter["pending"]= counter["pending"]+1
        }
        return counter
    },

    formatDateToDisplay(date){
        const dateInParts=date.split("-")
        return dateInParts[2]+"/"+dateInParts[1]+"/"+dateInParts[0]
    },

    calculatePeriod(date, period, repetition){
        const dateInParts=date.split("-")
        let internalDate=new Date(dateInParts[0],dateInParts[1]-1,dateInParts[2])
        count=0
        while (count<repetition){
            if(period==="week"){
                internalDate.setDate(internalDate.getDate()+7)
            }
            else if(period==="month"){
                internalDate.setMonth(internalDate.getMonth()+1)
            }
            count=count+1
        }
        return this.formatSystemDateToStringSystemDate(this.extractOnlyDate(internalDate))
    },
}

function start(newSession){
    if (newSession){
        HTML.addLinksAddTask()
    }
    HTML.webElements()
    HTML.addLinksButtonsInTable()
}

start(true)