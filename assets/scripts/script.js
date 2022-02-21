//pegar o dado da tarefa
const assignment = document.querySelector('#tarefa');

//pegar o dado not_done btn
const btn = document.querySelector('#btn');

//pegar ul html
const ul = document.querySelector('#lista');

//botão para deletar tudo
const dell = document.querySelector('#dellAll')

const array = JSON.parse(localStorage.getItem('TODO')) || [];

btn.addEventListener('click', () => {
    if(assignment.value === ''){
        alert('Tarefa não pode ser vazio')
    }
    else{
        setTimeout(() => {
    
            array.push(assignment.value)
    
            localStorage.setItem('TODO', JSON.stringify(array));
    
            ul.innerHTML += 
                `<li class = "not_done">
                    ${assignment.value}
                    <img src="./assets/img/excluir.png" id="imgDel" class="icon">
                </li>`
                ;
    
                assignment.value = '';
        }, 2000);
    }
});

window.addEventListener('DOMContentLoaded', () => {
    JSON.parse(localStorage.getItem('TODO')).forEach((el) => {
        ul.innerHTML += `
          <li class = "not_done">
            ${el}
            <img src="./assets/img/excluir.png" id="imgDel" class="icon">
          </li>
      `;
    });
})

ul.addEventListener('click', (event) => {
    if(event.target.className === 'not_done'){
        event.target.classList.remove('not_done');
        event.target.classList.add('done');

    } else if (event.target.className === 'done'){
        event.target.classList.remove('done');
        event.target.classList.add('not_done');

    } else if (event.target.id === 'imgDel'){
        for(let i = 0; i < ul.childElementCount; i++){
            if(ul.children[i] === event.target.parentNode){
                array.splice(i,1)
                
                ul.children[i].outerHTML = '';
            }
        }

    }
    localStorage.setItem('TODO', JSON.stringify(array));

});

dell.addEventListener('click', () => {
    localStorage.clear();
    ul.innerHTML = '';
});


