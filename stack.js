const task = document.querySelector('#task');
const addButton = document.querySelector('#add-button');
const list = document.querySelector('#task-list');
let taskList = JSON.parse(localStorage.getItem('taskList')) || [];
let justRender = false;

const addTask = (element) => {

  const listItem = document.createElement('li');
  const sectionItem = document.createElement('div');
  const statusItem = document.createElement('input');

  listItem.id = element.id;

  if (justRender === false) {
    taskList.push(element);
  }
  
  sectionItem.textContent = element.name;

  statusItem.setAttribute('type', 'checkbox');

  statusItem.addEventListener('input', (event) => {
    const itemIndex = taskList.findIndex((item) => item.id === element.id);
    taskList[itemIndex].done = !taskList[itemIndex].done;
    if (taskList[itemIndex].done) {
      sectionItem.classList.add('line');
    } else {
      sectionItem.classList.remove('line');
    }
    localStorage.setItem('taskList', JSON.stringify(taskList));
  });

  if (element.done) {
    sectionItem.classList.add('line');
  }
  
  const deleteItem = document.createElement('button');
  deleteItem.textContent = 'Deletar Tarefa';

  deleteItem.addEventListener('click', (event) => {
    taskList = taskList.filter( (item) => item.id !== element.id );
    listItem.remove();
    localStorage.setItem('taskList', JSON.stringify(taskList));
  })
  
  sectionItem.appendChild(statusItem);
  sectionItem.appendChild(deleteItem);

  listItem.appendChild(sectionItem);
  
  list.appendChild(listItem)
};

taskList.forEach((task) => {
  justRender = true;
  addTask(task);
})


addButton.addEventListener('click', (event) => {
  const id = taskList.length > 0 ? parseInt(taskList[taskList.length -1 ].id) + 1 : 0;
  const newTask = {name: task.value, id, done: false};
  justRender = false;

  event.preventDefault();
  
  setTimeout(() => {
    addTask(newTask);
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }, 2000);
  
  task.value = '';
});
