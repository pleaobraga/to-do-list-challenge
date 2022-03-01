=> Iniciando a aplicação:
    Para iniciar o programa, deve-se clicar no arquivo index.html, 
    para que o mesmo seja aberto no navegador!!!

=> Objetivo da aplicação:
    Esta aplicação consiste em uma To-do-list (Lista de tarefas) simples,
    cujo objetivo é armazenar informaçães de tarefas a serem realizadas.

=> Manual do usuário: 
    Digite a sua tarefa no campo "Digite sua nova tarefa!!!" e clique no botão
    ao lado "Incluir".

    Sua tarefa será listada abaixo, com as letras em vermelho, significa que ela
    ainda está "por fazer".
    Conforme for realizando as tarefas, basta clicar sobre ela, que a cor da letra
    mudará para verde, sinalizando visualmente que a tarefa já foi realizada.

=> Descrição dos aquivos:
    Está aplicação é composta por 3 arquivos, um para o html (index.html), outro
    para a configuração de estilos (style.css) e um para as cofigurações de
    funcionalidades da aplicação (to-do-list.js).


=> Lógica da aplicação:
    No html estão os input's para a coleta dos dados a serem descritos na página.
    No Javascript, há uma função que coleta dos dados do LocalStorage para mantê-LocalStorage
    visualmente na pagina, mesmo quando atualizada.
    Há também o script que pega o dado no campo input do html e salva ele no localStorage.

=> OBS: 
    Ao rodar o script que deveria atualizar a cor da escrita conforme o status no localStorage (feito, não feito),
    o cor só mudava quando a página era atualizada. Tentei de várias formas ajustar isso para que ficasse de forma 
    automática quando fosse clicado na escrita, sem sucesso. Então acabei usando a função "location.reload()", para
    atualizar a página sempre que fosse dado um clique na escrita para mudar o status.

=> Aluno:
    Maicon Lenon da Silva Petiz