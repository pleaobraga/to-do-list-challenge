
let button = document.querySelector('#button')
let liList = document.querySelectorAll('li')
let field = document.querySelector('#field')

const localStorageList = () => {
    let fieldValue = []
    let status = []

    if (localStorage.fieldValue) {
        fieldValue.push(localStorage.fieldValue)
    }
    fieldValue.push(field.value)

    if (localStorage.status) {
        status.push(localStorage.status)
    }
    status.push('undone')

    localStorage.setItem('fieldValue', fieldValue)
    localStorage.setItem('status', status)
}

button.addEventListener('click', () => {    
    setTimeout(() => {
        if (field.value == '') {
            alert('Insira uma tarefa a ser adicionada');
        } else if (field.value != '') {
            let button = document.createElement('button')
            button.classList.add('undone')
            button.innerText = field.value
            list.appendChild(button)
            localStorageList()
            field.value = ''
        }
    }, 2000);
})

const refreshPage = () => {
    if (localStorage.length != 0) {
        let tasks = localStorage.getItem('fieldValue').split(',')
        let status = localStorage.getItem('status').split(',')
        tasks.forEach((elem, i) => {
            let button = document.createElement('button')
            button.classList.add(status[i])
            button.innerText = elem
            list.appendChild(button)
        })
    }
}

list.addEventListener('click', (event) => {
    if (localStorage) {
        let tasks = localStorage.getItem('fieldValue').split(',')
        let status = localStorage.getItem('status').split(',')

        if (event.target.classList.contains('undone')) {
            event.target.classList.remove('undone')
            event.target.classList.add('done')

            tasks.forEach((elem, i) => {
                if (elem === event.target.innerText) {
                    status[i] = 'done'
                    localStorage.setItem('status', status)
                }
            })

        } else if (event.target.classList.contains('done')) {
            event.target.classList.remove('done')
            event.target.classList.add('undone')

            tasks.forEach((elem, i) => {
                if (elem === event.target.innerText) {
                    status[i] = 'undone'
                    localStorage.setItem('status', status)
                }
            })
        }
    }
})

refreshPage()









