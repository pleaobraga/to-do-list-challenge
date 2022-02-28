const getStorage = () => JSON.parse(localStorage.getItem ('taskList')) ?? [];
const setStorage = (storage) => localStorage.setItem('taskList', JSON.stringify(storage));

const createItem = (task, status='', index) => {
  const item = document.createElement('label');
  item.classList.add('task__item');
  item.innerHTML = `
  <input type="checkbox" ${status} data-index = ${index}>
  <div>${task}</div>
  <input type="button" value="Deletar" data-index = ${index}>
  `
  document.getElementById('taskList').appendChild(item);
};

const clearTask = () => {
  const taskList = document.getElementById('taskList');
  while (taskList.firstChild) {
    taskList.removeChild(taskList.lastChild);
  }
};

const refreshScreen = () => {
  clearTask();
  const storage = getStorage();
  storage.forEach((item, index) => createItem(item.tarefa, item.status, index));
};

const addItem = (event) => {
  setTimeout(() => {
    const key = event.key;
    const task =  event.target.value;
    if (key === 'Enter') {
      const storage = 
      getStorage();
      storage.push({'tarefa': task, 'status': ''});
      setStorage(storage);
      refreshScreen();
      event.target.value = '';
    }
  }, 2000)
};

const removeItem = (index) => {
  setTimeout(() => {
    const storage = getStorage();
    storage.splice (index, 1);
    setStorage(storage);
    refreshScreen();
  }, 2000)
};

const refreshItem = (index) => {  
  const storage = getStorage();
  storage[index].status = storage[index].status === '' ? 'checked' : '';
  setStorage(storage);
};

const clickItem = (event) => {
  const element = event.target;
  if (element.type === 'button') {
    const index = element.dataset.index;
    removeItem(index);
  } else if (element.type === 'checkbox') {
    const index = element.dataset.index;
    refreshItem(index);
  }
};

document.getElementById('newItem').addEventListener('keypress', addItem);
document.getElementById('taskList').addEventListener('click', clickItem);

refreshScreen();

