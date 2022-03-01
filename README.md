# to-do-list-challenge

## Proposta de Teste

Criar uma to-do list que consiste em adicionar elementos a uma lista e poder marca-los como feito ou não

## Requisitos Obrigatórios

- Utilizar JS, HTML e CSS puro, ou seja sem qualquer tipo de biblioteca ou framework
- A solução deve apresentar um campo para inserir o nome da tarefa a ser feita e um botao para adicionar a tarefa a lista
- Ao adicionar uma nova tarefa esperar 2 segundos para que seja exibido na lista de tarefas.
- Ao adicionar uma nova tarefa ela deverá vir por padrão no estado de a fazer
- A solução deve apresentar uma lista para listar as tarefas
- Cada elemento da lista deverá apresentar 2 estados diferentes, um pra item a se fazer e um para item feito e tem que ter uma diferença visual entre eles
- Ao clicar no item da lista o mesmo deve mudar se estado, feito -> a fazer ou a fazer -> feito
- Deve ser possível armazenar quantos items o usuario quiser a lista
- A lista deve ser armazenada de uma forma que se o usuario entrar novamente na pagina ele poderá ver todos os itens ja cadastrados e seus respectivos estados
- Criar uma boa documentação para a solução (README).

## Requisitos Opcionais (Plus)

- Implementar uma solução otimizada
- Em cada elemento da lista apresentar um botao de deletar e caso o usuario aperte esse botao o item some da lista
- Implementar uma boa interface gráfica para a solução
- Publicar a aplicação em algum ambiente (GitHub Pages,...)
- caso o aluno queira implementar mais alguma funcionalidade fique a vontade, mas deixe explicado no README

## Author
 
 Bianca de Albuquerque Viana
 Turma: 816 Full Stack Degree

## Descrição do Projeto

 Este projeto servirá para a avaliação do módulo de FrontEnd Dinâmico do curso de Web Full Stack.
 O projeto é uma Todo list que recebe uma tarefa, armazena em uma lista e renderiza essa tarefa na tela. Esta tarefa poderá ser marcada como concluida ao clicar no ckeckbox e poderá ser excluida ao clicar no botão de excluir. Ao final, ao recaregar a página, a informação inserida ateriormente continua aparecendo na tela até que seja excluida pelo usuário.

 ## Status do Projeto
 
 Concluído para entrega, com 9 dos 10 Requisitos Obrigatórios cumpridos.

 ## Manual do usuário

1 - Abra Lista de tarefas;

2 - Insira a tarefa no campo 'New todo..' e clique no botão de adicionar: ' + ' para adicionar a tarefa;
(Note que caso o usuário tente inserir uma tarefa em branco, um alerta aparecerá informando que é nescessário uma entrada para prosseguir com a aplicação e nenhuma ação será feita)

3 - Tarefas adicionadas tem por padrão o estado de 'não feito' que muda ao clicar no checkbox, e a alteração de estado fica visivel. Essa alteração é reversível ao clicar novamente no checkbox.

4 - A lista com as tarefas permanece salva mesmo após o usuário fechar ou recarregar a página atual.

## Resolução do Problema

.O projeto possui 3 arquivos principais: HTML, JS e CSS.

.Criasse a função para capturar e renderizar os dados fornecido pelo input HTML. Essa função contém elementos criados dinamicamente que farão parte da estrutura de cada tarefa. É nessa função que se encontra a chamada para a função que salva a tarefa no localStorage.

.Também há uma função para fazer a verificaão de status da tarefa, e juntamente com o CSS, ocorre a mudança visual da tarefa quando marcada.

.Ao final, as funções para salvar e renderizar a lista no localStorage. Assim, mesmo que a pagina seja recarregada, os dados inseridos permanecem na pagina.

## Requisitos não concluidos e bugs

1 - A lista deve ser armazenada de uma forma que se o usuario entrar novamente na pagina ele poderá ver todos os itens ja cadastrados e seus respectivos estados.

Justificativa: Eu consigo pegar o objeto, renderizar na tela e salvar no localStorage para que ao atualizar a tarefa permaneça porém a animação de 'checked' não renderiza com ela.
O status em si (true ou false) ficão salvos no localStorage, mas não no documento renderizado.


2 - Quando não há tarefa o console mostra um erro do forEach porque ele não tem ninguém pra iterar antes da pagina ser atualizada, mas quando é adicionado um item esse erro some.
