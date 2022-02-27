# to-do-list-challenge

## Guilherme Pereira de Oliveira, 816 Web Full Stack Degree, Módulo 05  JS Vanilla

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

## Manual do usuário
- Abra [Lista de tarefas](http://127.0.0.1:5500/index.html)
- Insira a tarefa no campo a esquerda do botão de inserir tarefa
- Clique no botão de inserir tarefa. A tarefa será adicionada a uma lista dois segundos após o click. Caso tente-se inserir uma tarefa em branco, um alerta será disparado para que o campo seja preenchido e nenhuma ação será feita
- Cada nova tafera adicionada vem como padrão 'não feito '
- Todas as tarefas adicionadas a lista são botões clicáveis que mudam o estado de 'não feito' para 'feito' e vice-versa
- Todas as alterações feitas na lista ficam salvas mesmo após o usuário fechar a aba atual ou recarregar a página

## Resolução do problema
- Foram criados três arquivos: HTML, JavasCript e CSS.
- Os dados capturados no campo de input do HTML são renderizados na tela e armazenados na localStorage através do JS.
- A ação de mudar o status da tarefa se dá através do JS e CSS e é renderizado no HTML. Após cada ação esses dados são salvos na localStorage.
- Uma função pega os dados armazenados na localStorage e os renderiza. Essa ação evita que os dados renderizados sejam perdidos ao ao fechar a página ou recarrega-lá.

## Próximos passos
- Adicionar um botão para a retirada de tarefas já realizadas
- Adcionar uma funcionalidade que separa as tarefas entre 'feitas' parte inferior da lista e 'não feitas' parte superior da lista
- Melhorar a acessibilidade e segurança do sistema uma vez que nesse último quesito a localStorage pode ser acessada e manipulada por um usuário.
- Refatorar o código para que ele fique otimizado.

## Sobre o autor

[Linkedin](https://www.linkedin.com/in/guilherme-pereira-de-oliveira-110543178/)


