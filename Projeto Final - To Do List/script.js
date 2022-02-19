//https://github.com/pleaobraga/to-do-list-challenge
//https://github.com/pleaobraga/to-do-list-challenge/blob/main/README.md


const taskList = document.querySelector('ul');
taskList.innerHTML = localStorage.getItem('data');

const allLi = document.querySelectorAll('li');
const allTaskWrapper = document.querySelectorAll('.taskWrapper');
const allTask = document.querySelectorAll('.task');
const allDelBtn = document.querySelectorAll('.delBtn');
const input = document.querySelector('input');
const addTaskButton = document.querySelector('#addTaskButton')

    function saveData() {
        localStorage.setItem('data',taskList.innerHTML)
    }

    function addTask() {
        if (input.value === '') {
            return alert ('Campo TAREFA vazio')
        }

        let wrapper = createWrapper();
        let newTask = createTask();
        let delBtn = createDelBtn();
                
        wrapper.appendChild(newTask);
        wrapper.appendChild(delBtn);
        input.value ='';
        input.setAttribute('Placeholder','Processando...');
        setTimeout(() => {
            taskList.appendChild(wrapper);
            input.setAttribute('Placeholder','Insira sua tarefa aqui...');
            saveData();
        },2000)
    }

        function createWrapper() {
            let wrapper = document.createElement('div');
            wrapper.classList.add('taskWrapper');
            return wrapper
        }

        function createTask() {
            let task = document.createElement('li');
            task.classList = 'task';
            task.textContent = input.value;
            task.addEventListener('click',event => { 
                event.target.classList.toggle('done'); // É a classe que dá o efeito de riscado à tarefa clicada
                saveData()        
            }); 
            return task;
        }

        function createDelBtn() {
            let btn = document.createElement('button');
            btn.innerHTML = '<i class="fa-solid fa-trash"></i>';
            btn.classList = 'delBtn';
            btn.addEventListener('click', () => {
                btn.parentNode.remove();
                saveData();
            })
            return btn;
        }

//Execução Inicial
allDelBtn.forEach((delBtn) => {
    delBtn.addEventListener('click', () => {
        delBtn.parentNode.remove()
        saveData();
        })
    })-

allTask.forEach((task) => {
    task.addEventListener('click',event => {
        event.target.classList.toggle('done');
        saveData()
})
})

addTaskButton.addEventListener('click',addTask)

input.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        addTask();
    }
})



