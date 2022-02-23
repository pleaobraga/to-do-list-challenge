const assignment = document.querySelector('#task');
const btn = document.querySelector('#btn');
const ul = document.querySelector('#list');
const dell = document.querySelector('#dellAll')

const myStorage = JSON.parse(localStorage.getItem('TODO')) || [];

const state = "not_done"

function createLi(value, state, id){
    const imgDel = document.createElement('img');
    imgDel.src = "./assets/img/excluir.png";
    imgDel.id = 'imgDel';
    imgDel.classList.add('icon');
    
    const li = document.createElement('li');
    li.id = id;
    li.classList.add(`${state}`);
    li.appendChild(document.createTextNode(value));
    li.appendChild(imgDel);

    ul.appendChild(li);
}

btn.addEventListener('click', () => {
    if(assignment.value === ''){
        alert('Tarefa não pode ser vazio')
    }
    else{
        setTimeout(() => {
    
            const elementId = myStorage.length > 0 ? parseInt(myStorage[myStorage.length - 1].id) + 1 : 1;

            myStorage.push({value : assignment.value, state : state, id : elementId});
    
            localStorage.setItem('TODO', JSON.stringify(myStorage));

            createLi(assignment.value, state, elementId);
    
            assignment.value = '';
        }, 2000);
    }
});

window.addEventListener('DOMContentLoaded', () => {
    myStorage.forEach((todo) => {
      createLi(todo.value, todo.state, todo.id);
    });
})

ul.addEventListener('click', (event) => {
    const elementIndex = myStorage.findIndex((todo) => {

        return parseInt(todo.id) === parseInt(event.target.id);
    
    })

    if(event.target.className === 'not_done'){
        event.target.classList.remove('not_done');
        event.target.classList.add('done');

        myStorage[elementIndex].state = "done"
    
    } else if (event.target.className === 'done'){
        event.target.classList.remove('done');
        event.target.classList.add('not_done');
    
        myStorage[elementIndex].state = "not_done";

    } else if (event.target.id === 'imgDel'){
        for(let i = 0; i < ul.childElementCount; i++){

            if(ul.children[i] === event.target.parentNode){
                myStorage.splice(i,1);
                ul.children[i].outerHTML = '';
            }
        }
    }
    localStorage.setItem('TODO', JSON.stringify(myStorage));
});

dell.addEventListener('click', () => {
    if (myStorage.length === 0 || localStorage.getItem("TODO") === null){
        alert("Não há nada para ser deletado!")
        
    } else{
        let confirme = confirm("Você realmente deseja apagar tudo?");
        if(confirme === true){
            localStorage.clear();
            ul.innerHTML = '';
        
            alert("Foi deletado tudo");
        } else {
            alert("Não foi apagado nada");
        }
    }
    
});