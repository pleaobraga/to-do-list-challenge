class Task {
    constructor(repetition, description, date, observation){  
        this.id=this.createID()
        this.repetition=repetition
        this.description=description,
        this.date=date,
        this.observation=observation,
        this.createdAt=UTILS.formatSystemDateToStringSystemDate(new Date),
        this.updatedAt=UTILS.formatSystemDateToStringSystemDate(new Date),
        this.done=false
    }

    createID() {
        const lengthTasks = TASK.tasks.length
        if (lengthTasks==0){
            return 1
        }
        else{
            const index=lengthTasks-1
            const lastTask=TASK.tasks[index]
            const idlastTask=lastTask.id
            return idlastTask+1
        }
    }
}

class Filter {
    constructor(
        itensPerPage=7, 
        page=1, 
        selections={
            'arrears': true,
            'warning': true,
            'pending': true,
            'done': true
        },
        dates={
            'start': '',
            'end': ''
        }
    ){
        this.itensPerPage=itensPerPage,
        this.page=page,
        this.selections=selections,
        this.dates=dates
    }
}

const MODAL = {
    open(formHtml, formDo, elementId){
        this.closeForms()
        FORM.clearFields(formHtml)
        FORM.configFields(formHtml, formDo)
        FORM.valueFields(formHtml, formDo, elementId)
        
        if (formHtml==='task'){
            HTML.modalOverlay.addEventListener('click', evt => this.closeInClick(evt))
            HTML.modalTask.classList.add('active')
        }
        else if (formHtml==='filter'){
            HTML.modalOverlay.addEventListener('click', evt => this.closeInClick(evt))
            HTML.modalFilter.classList.add('active')
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
    get(){
        return JSON.parse(sessionStorage.getItem("todo-list:filter"))
    },
    set(filter){
        sessionStorage.setItem("todo-list:filter", JSON.stringify(filter))
    }
}

const TASK = {
    tasks: STORAGE.get(),

    create(formValues) {
        const repetition=formValues.repetition
        const description= formValues.description
        const date= formValues.date
        const observation=formValues.observation
        const task= new Task(repetition, description, date, observation)    
        this.tasks.push(task)
        STORAGE.set(this.tasks)
    },
    
    save(formValues) {     
        const task=this.catch(formValues.id)
        const index=this.tasks.indexOf(task)
        task.description= formValues.description
        task.date= formValues.date
        task.observation=formValues.observation
        task.updatedAt= UTILS.formatSystemDateToStringSystemDate(new Date)
        this.tasks.splice(index, 1, task)
        STORAGE.set(this.tasks)
    },
    
    delete(id) {
        const task=this.catch(id)
        const index=this.tasks.indexOf(task)
        this.tasks.splice(index, 1)
        STORAGE.set(this.tasks)
        start(false)
    },
    
    changeDone(id) {   
        const task=this.catch(id)
        const index=this.tasks.indexOf(task)
        task.done=!task.done
        task.updatedAt= UTILS.formatSystemDateToStringSystemDate(new Date)
        this.tasks.splice(index, 1, task)
        STORAGE.set(this.tasks)
        start(false)
    },
    
    catch(id) {
        return this.tasks.find(task => task.id == id)
    },

    tratamentToShow(){
        const filter = FILTER.filter
        let tratedTasks=[]     
        let counters = {
            "arrears": 0,
            "warning": 0,
            "pending": 0
        }
        this.tasks.forEach(task => {
            if ((task.date>=filter.dates.start||filter.dates.start==="") && (task.date<=filter.dates.end||filter.dates.end==="")){
                newTask = {
                    "id": task.id,
                    "status": UTILS.checkStatus(task),
                    "description": task.description,
                    "date": task.date
                }
                if (filter.selections[newTask.status]){
                    tratedTasks.push(newTask)            
                }
                counters[newTask["status"]]= counters[newTask["status"]]+1
            }
        });
        return {"tasks": tratedTasks, "counters": counters};
    }
}

const FILTER = {
    filter: SESSIONSTORAGE.get("filter"), 
       
    create(itensPerPage, page, selections, dates){
        const filter= new Filter(itensPerPage, page, selections, dates)
        this.filter=filter
        SESSIONSTORAGE.set(filter)
    },

    apply(){
        const tasks=TASK.tratamentToShow()['tasks']
        const lenTasks=tasks.length
        const pages=Math.ceil(lenTasks/this.filter['itensPerPage'])
        const firstItem=(this.filter['page']-1)*this.filter['itensPerPage']
        const lastItem=(this.filter['page'])*this.filter['itensPerPage']        
        return {
            'toShow': tasks.slice(firstItem, lastItem),
            'counters': TASK.tratamentToShow()['counters'],
            'currentPage': this.filter['page'],
            'pages': pages,
            'selections': this.filter['selections']
        }
    },

    navigate(navigateTo){
        const currentPage=HTML.taskCurrent.innerText
        const lastPage=HTML.taskLast.innerText
        const filter = this.filter
        if (navigateTo=="previous"){
            if (currentPage>1){
                filter['page']=filter['page']-1
                this.filter=filter
                SESSIONSTORAGE.set(filter)
            }
        }
        else if (navigateTo=="next"){
            if (currentPage<lastPage){
                filter['page']=filter['page']+1
                this.filter=filter
                SESSIONSTORAGE.set(filter)
            }
        }
        start(false)
    },

    changeCardSelection(card){
        const filter = this.filter
        filter.selections[card]=!filter.selections[card]
        this.filter=filter
        SESSIONSTORAGE.set(filter)
        start(false)
    }
}

const HTML = {
    modalOverlay: document.querySelector('.modal-overlay'),
    modalTask: document.querySelector('.modal.tasks'),
    modalFilter: document.querySelector('.modal.filter'),
    modals: document.querySelectorAll('.modal'),
    cardArrears: document.querySelector('#cardArrears'),
    cardWarning: document.querySelector('#cardWarning'),
    cardPending: document.querySelector('#cardPending'),
    cardArrearsCount: document.querySelector('#cardArrearsCount'),
    cardWarningCount: document.querySelector('#cardWarningCount'),
    cardPendingCount: document.querySelector('#cardPendingCount'),
    tbodyTasks: document.querySelector('.tbody-tasks'),
    taskLeft: document.querySelector('#paginate #left'),
    taskRight: document.querySelector('#paginate #right'),
    taskCurrent: document.querySelector('#paginate #current'),
    taskLast: document.querySelector('#paginate #last'),

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

        console.log(task)

        td.appendChild(this.addSpanToTdCommand("view", task, "👁"))
        td.appendChild(this.addSpanToTdCommand("edit", task, "🖉"))
        td.appendChild(this.addSpanToTdCommand("delete", task, "🗑"))
        let text=""
        if(task.status==="done"){
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
        const tasks = FILTER.apply()
        this.clearTaskTable()
        if (tasks['toShow'].length>0){
            tasks['toShow'].forEach(task => {
                const tr = document.createElement('tr')
                tr.classList.add("tr-tasks")                
                tr.appendChild(this.addTdsToTr("status", task.status, "⬤"))
                tr.appendChild(this.addTdsToTr("description", task.status, task.description))
                tr.appendChild(this.addTdsToTr("date", task.status, UTILS.formatDateToDisplay(task.date)))
                tr.appendChild(this.addTdCommandToTr("commands", task))
                this.tbodyTasks.appendChild(tr)
            });
        }
        this.cardArrearsCount.innerText=tasks['counters']['arrears']
        this.cardWarningCount.innerText=tasks['counters']['warning']
        this.cardPendingCount.innerText=tasks['counters']['pending']
        if (!tasks['selections']['arrears']){
            this.cardArrears.classList.add('notSelected')
        }
        else {
            this.cardArrears.classList.remove('notSelected')
        }
        if (!tasks['selections']['warning']){
            this.cardWarning.classList.add('notSelected')
        }
        else {
            this.cardWarning.classList.remove('notSelected')
        }
        if (!tasks['selections']['pending']){
            this.cardPending.classList.add('notSelected')
        }
        else {
            this.cardPending.classList.remove('notSelected')
        }
        this.taskCurrent.innerText=tasks['currentPage']
        this.taskLast.innerText=tasks['pages']
    },

    addLinksAddTask(){
        const ul = document.querySelector('ul#menuTask');
        ul.addEventListener('click', evt => MODAL.open('task', evt.target.id));
    },

    addLinksButtonsInTable(){
        const trs = document.querySelectorAll('.tr-tasks');
        trs.forEach(tr => {
            const td = tr.querySelectorAll('td')[3]
            td.addEventListener('click', evt => UTILS.checkHTMLOrder(evt.target.id));
        });
    },
}

const FORM = {
    getElements(formHtml){
        if (formHtml=='task'){
            return {
                taskTitle: document.querySelector('#task_title'),
                id: document.querySelector('input#task_id'),
                do: document.querySelector('input#task_do'),
                repetition: document.querySelector('input#task_repetition'),
                description: document.querySelector('input#task_description'),
                date: document.querySelector('input#task_date'),
                observation: document.querySelector('textarea#task_observation'),
                btnSubmit: document.querySelector('#task_submit'),
                btnCancel: document.querySelector('#task_cancel')
            }
        }
        else if (formHtml=='filter'){
            return{
                itensPerPage: document.querySelector('#filter_itensPerPage'),
                checkArrear: document.querySelector('#filter_checkArrear'),
                checkWarning: document.querySelector('#filter_checkWarning'),
                checkPending: document.querySelector('#filter_checkPending'),
                checkDone: document.querySelector('#filter_checkDone'),
                start_date: document.querySelector('#filter_start_date'),
                end_date: document.querySelector('#filter_end_date'),
                btnSubmit: document.querySelector('#filter_submit'),
                btnCancel: document.querySelector('#filter_cancel')
            }
        }
    },

    getValues(formHtml){
        if (formHtml=='task'){
            const taskElements = this.getElements(formHtml)
            return {
                taskTitle: taskElements.taskTitle.innerText,
                id: taskElements.id.value,
                do: taskElements.do.value,
                repetition: taskElements.repetition.value,
                description: taskElements.description.value,
                date: taskElements.date.value,
                observation: taskElements.observation.value
            }
        }
        else if (formHtml=='filter'){
            const taskElements = this.getElements(formHtml)
            return {
                itensPerPage: taskElements.itensPerPage.value,
                checkArrear: taskElements.checkArrear.checked,
                checkWarning: taskElements.checkWarning.checked,
                checkPending: taskElements.checkPending.checked,
                checkDone: taskElements.checkDone.checked,
                start_date: taskElements.start_date.value,
                end_date: taskElements.end_date.value
            }
        }
    },

    validateFields(formHtml) {
        if (formHtml=='task'){
            const formValues = this.getValues(formHtml)    
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
        else if (formHtml=='filter'){
            const formValues = this.getValues(formHtml)    
            if( formValues.itensPerPage.trim() === ""){
                throw new Error("Por favor, preencha o campo de itens por página.")
            }
            else if(formValues.start_date!="" && formValues.end_date!="" && formValues.start_date>formValues.end_date){
                throw new Error("Data inicial maior do que a data final.")
            }
            else{
                
                return formValues;
            }
        }
    },

    clearFields(formHtml) {
        if (formHtml=='task'){
            const taskElements = this.getElements(formHtml)
            taskElements.taskTitle.innerText = ""
            taskElements.id.value = ""
            taskElements.do.value = ""
            taskElements.repetition.value = ""
            taskElements.description.value = ""
            taskElements.date.value = ""
            taskElements.observation.value = ""
        }
        else if (formHtml=='filter'){
            const filterElements = this.getElements(formHtml)
            filterElements.itensPerPage.value = ""
            filterElements.checkArrear.checked = false
            filterElements.checkWarning.checked = false
            filterElements.checkPending.checked = false
            filterElements.checkDone.checked = false
            filterElements.start_date.value = ""
            filterElements.end_date.value = ""
        }
    },

    configFields(formHtml, formDo) {  
        if (formHtml==="task"){
            const taskElements = this.getElements(formHtml)
            if (formDo==="simple" || formDo==="week" || formDo==="month"){
                if(formDo==="simple"){
                    taskElements.repetition.readOnly = true;
                    taskElements.repetition.min=String(1);
                }
                else{
                    taskElements.repetition.readOnly = false;
                    taskElements.repetition.min=String(2);
                }
                taskElements.description.readOnly=false
                taskElements.date.readOnly=false
                taskElements.observation.readOnly=false
                taskElements.btnSubmit.hidden=false
            }
            else if(formDo==="edit"){
                taskElements.repetition.readOnly = true;
                taskElements.repetition.min=String(1);
                taskElements.description.readOnly=false
                taskElements.date.readOnly=false
                taskElements.observation.readOnly=false
                taskElements.btnSubmit.hidden=false
            }
            else if(formDo==="view"){
                taskElements.repetition.readOnly=true
                taskElements.repetition.min=String(1);
                taskElements.description.readOnly=true
                taskElements.date.readOnly=true
                taskElements.observation.readOnly=true
                taskElements.btnSubmit.hidden=true
            }
        }
    },

    valueFields(formHtml, formDo, elementId) {
        if (formHtml==="task"){
            const taskElements = this.getElements(formHtml)
            taskElements.do.value=formDo   
            if (formDo==="simple" || formDo==="week" || formDo==="month"){
                if(formDo==="simple"){
                    taskElements.taskTitle.innerText = "TAREFA"
                    taskElements.repetition.value
                    taskElements.repetition.value = String(1);
                }
                else if (formDo==="week"){
                    taskElements.taskTitle.innerText = "TAREFAS SEMANAIS"
                    taskElements.repetition.value = String(2);
                }
                else if (formDo==="month"){
                    taskElements.taskTitle.innerText = "TAREFAS MENSAIS"
                    taskElements.repetition.value = String(2);
                }
                taskElements.btnSubmit.innerText="Criar"
                taskElements.btnCancel.innerText="Cancelar"
            }
            else{     
                const task=TASK.catch(elementId)
                if(formDo==="edit"){
                    taskElements.taskTitle.innerText = "EDITAR TAREFA"
                    taskElements.btnSubmit.innerText="Salvar"
                    taskElements.btnCancel.innerText="Cancelar"
                }          
                if(formDo==="view"){
                    taskElements.taskTitle.innerText = "TAREFA"
                    taskElements.btnCancel.innerText="Fechar"
                } 
                taskElements.id.value=task.id  
                taskElements.repetition.value=task.repetition
                taskElements.description.value=task.description
                taskElements.date.value=task.date
                taskElements.observation.value=task.observation
            }
        }
        else if (formHtml==="filter"){
            const filterElements = this.getElements(formHtml)
            const filter = FILTER.filter
            filterElements.itensPerPage.value=filter.itensPerPage
            filterElements.checkArrear.checked=filter.selections.arrears
            filterElements.checkWarning.checked=filter.selections.warning
            filterElements.checkPending.checked=filter.selections.pending
            filterElements.checkDone.checked=filter.selections.done
            filterElements.start_date.value=filter.dates.start
            filterElements.end_date.value=filter.dates.end
            filterElements.btnSubmit.innerText="Filtrar"
            filterElements.btnCancel.innerText="Cancelar"
        }
    },
    
    buttonSubmit(event, form){
        event.preventDefault()
        try {
            const formValues = this.validateFields(form)
            MODAL.closeOverlay()
            if (form=='task'){
                if (formValues.do==="simple" || formValues.do==="week" || formValues.do==="month"){
                    setTimeout(() => {  
                        let repetition=0
                        const maxPeriod=parseInt(formValues.repetition)
                        const originalDate=formValues.date
                        while (repetition<maxPeriod){
                            let formToCreate=formValues
                            formToCreate.date=UTILS.calculatePeriod(originalDate, formValues.do, repetition)
                            TASK.create(formToCreate) 
                            if (repetition+1==maxPeriod){
                                start(false)
                            }
                            repetition=repetition+1
                        }
                    }, 2000);
                }
                else if (formValues.do==="edit"){
                    TASK.save(formValues)
                    start(false)
                }
            }
            else if(form=='filter'){
                let formToFilter=formValues
                const itensPerPage=parseInt(formToFilter.itensPerPage) 
                const selections={
                    'arrears': formToFilter.checkArrear,
                    'warning': formToFilter.checkWarning,
                    'pending': formToFilter.checkPending,
                    'done': formToFilter.checkDone
                }
                const dates={
                    'start': formToFilter.start_date,
                    'end': formToFilter.end_date
                }

                FILTER.create(itensPerPage, 1, selections, dates) 
                start(false)    
            }
        } catch (error) {
            alert(error.message)
        }
    },
    
    buttonCancel(form){
        this.clearFields(form)
        MODAL.closeOverlay()
        start(false)
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
        const idTask=parseInt(infoElement[1])
        if (infoElement[0]=="view" || infoElement[0]=="edit"){
            
            MODAL.open("task", infoElement[0], idTask)
        }
        else if (infoElement[0]=="delete"){
            TASK.delete(idTask)
        }
        else if (infoElement[0]=="changeDone"){
            TASK.changeDone(idTask)
        }
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
        if (!FILTER.filter){
            FILTER.create()
        }
        HTML.addLinksAddTask()
    }
    HTML.webElements()
    HTML.addLinksButtonsInTable()
}

start(true)