# To-do List App

O projeto de conclusão do módulo 05 - Front-End Dinâmico JS Vanilla, lecionado pelo professor <a href="https://github.com/pleaobraga">Pedro Leão</a>, encontra-se abaixo e pode ser acessado através do <a href="https://tiagocastelfranchi.github.io/conclusao-mod5/">Link da aplicação</a>.

## Proposta de Teste

Criar uma to-do list que consiste em adicionar elementos à uma lista e poder marcá-los como feito ou não.

## Requisitos Obrigatórios

- Utilizar JS, HTML e CSS puro, ou seja sem qualquer tipo de biblioteca ou framework;
- A solução deve apresentar um campo para inserir o nome da tarefa a ser feita e um botao para adicionar a tarefa a lista;
- Ao adicionar uma nova tarefa esperar 2 segundos para que seja exibido na lista de tarefas;
- Ao adicionar uma nova tarefa ela deverá vir por padrão no estado de a fazer;
- A solução deve apresentar uma lista para listar as tarefas;
- Cada elemento da lista deverá apresentar 2 estados diferentes, um pra item "a fazer" e um para item "feito" sendo que deverá conter certa diferença visual entre eles;
- Ao clicar no item da lista o mesmo deverá mudar se estado, exemplo: 
feito -> a fazer, 
ou 
a fazer -> feito
- Deve ser possível armazenar quantos items o usuário quiser à lista;
- A lista deve ser armazenada de uma forma que, caso o usuario entrar novamente na página ele poderá ver todos os itens já cadastrados e seus respectivos estados;
- Criar uma boa documentação para a solução (README).

## Requisitos Opcionais

- Implementar uma solução otimizada;
- Em cada elemento da lista apresentar um botao de deletar e caso o usuario aperte esse botão o item some da lista;
- Implementar uma boa interface gráfica para a solução;
- Publicar a aplicação em algum ambiente;
- Caso o aluno queira implementar alguma funcionalidade a mais fique a vontade, mas deixe explicado no README.

## Objetivo principal

O objetivo do projeto foi desenvolver uma lista de afazeres, onde o usuário insere uma tarefa e ela é adicionada à uma lista que ficará guardada no <i>localStorage</i> afim de se manter no navegador onde a aplicação foi acessada, mesmo que ele seja fechado. O aplicativo conta com as funções, além de "adicionar tarefa", excluir tarefa, tarefa concluída e editar tarefa. Também possuí as abas de todas as tarefas, tarefas pendentes e tarefas feitas.

## Modo de utilização

### 1- Inserindo a tarefa:
- O primeiro passo para o usuário que deseja inserir uma tarefa no aplicativo é clicar na caixa reservada para inserção de texto;
- Digitar o nome da tarefa que se deseja cumprir;
- Pressionar a tecla "Enter" ou clicar no botão "+" ao lado do input.

### 2- Tarefa concluída:
- Para o usuário dar uma tarefa como concluída ele deve clicar na caixa (checkbox) ao lado do nome da tarefa, para que assim ela se torne verde e com uma linha sobre o texto.

### 3- Editar tarefa:
- Caso o usuário deseje editar o nome de uma tarefa da lista, ele deve clicar no botão com 3 pontos, o qual irá abrir um menu com as opções "Editar" e "Deletar" e selecionar a opção "Editar";
- O nome da tarefa será inserido automaticamente no campo de input para que então seja feita a edição do nome;
- Após modificar o nome antigo para o desejado, o usuário deverá pressionar a tecla "Enter" ou clicar no botão "+" ao lado do input.

### 4- Excluir tarefa:
- Caso o usuário deseje excluir uma tarefa da lista, ele deve clicar no botão com 3 pontos, o qual irá abrir um menu com as opções "Editar" e "Deletar" e selecionar a opção "Deletar";
- A tarefa irá sumir da lista e não será mais possível encontrá-la.

### 5- Excluir todas tarefas:
- Caso o usuário deseje excluir <b>TODAS</b> as tarefas basta ele clicar no botão "Limpar tudo" o qual se encarregará de excluir todas as tarefas da lista.

### 6- Abas:
- As tarefas que não foram dadas como concluídas podem ser encontradas na aba "Pendentes";
- As tarefas já concluídas podem ser encontradas na aba "Feitas";
- Todas as tarefas, independente do status, podem ser encontradas na aba "Todas".

### Observações:
- O aplicativo conta com uma mensagem de orientação para o usuário que indica se a aba possuí ou não tarefas. Caso a aba acessada esteja vazia, será exibido a mensagem de "Você não possui tarefas nessa seção.";
- As funções "Exluir tarefa" e "Editar tarefa" podem ser feitas em todas as abas sem a propagação de bugs.

## Pontos de melhoria:
- Abaixo são citadas algumas melhorias que o programador pôde enxergar, mas não implementar ainda devido ao conhecimento em expansão. São elas:
    Melhoria do layout, implementação de responsividade, adicionar uma função para modificar o tema do aplicativo, adicionar uma lista separada que irá armazenar os itens excluídos, otimização do código e inserir uma função de alert caso o usuário deseje excluir todas as tarefas listadas.



<!-- # to-do-list-challenge

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


## Entrega

A entrega deverá ser feita ate o dia 28/02/2022

Para a entrega o aluno deverá criar um pull request(PR) para esse repositório.


## Observações

- Não será aceito trabalhos após essa data
- Se o sistema não rodar o aluno ficará com a nota 0
- Não será permitido copias e se isso for detectado os alunos envolvidos ficarão com a nota 0 -->
