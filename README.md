# to-do-list-challenge

## Autoria
- Pedro Henrique da Silva Pacheco
- Projeto feito para final do módulo 5 (Front End Dinâmico), do curso Web Full Stack da Let's Code.
- A aplicação foi feita baseada em HTML, CSS e JavaScript.

## Proposta de Teste

- Criar uma to-do list que consiste em adicionar elementos a uma lista e poder marca-los como feito ou não


## Link
URL do projeto (https://pedpacheco.github.io/to-do-list-challenge/)

## Manual do usuário

### Adicionar tarefa 
1. Insira o nome de uma tarefa no campo "Insira uma nova tarefa".
2. Clique no botão "adicionar" ou aperte a tecla enter. Após isso a tarefa será adicionada à lista depois de 2 segundos.

### Marcar tarefa como feita
1. Clique na tarefa para marcar-lá como feita.
2. O estado da tarefa pode ser revertido clicando outra vez na tarefa.

### Excluir tarefa
1. Clique no botão remover para assim excluir a tarefa da lista. 


## Solução do problema

### Adicionando tarefa 
1. Foram inseridos um evento de click no botão Adicionar e um evento de submit no formulário de adição da tarefas, assim que o evento for detectado vai ser chamada a função "addTask".

2. Dentro da função "addTask" será feito uma validação se há alguma tarefa no campo de adição de tarefas, após isso será chamada a função "createTask".

3. Na função "createTask" será criado todo o html da tarefa, junto com o botão de remoção de tarefa que é criado através da função "createRemoveTaskButton", depois disso a tarefa criada será adicionada a lista de tarefas para fazer.

4. Depois da task se adicionada na lista, será chamada a função "saveLocal" que irá salvar a tarefa no LocalStorage.

### Mudando o estado das tarefas
1. Tanto a lista de tarefa para fazer, quanto a lista de tarefas feitas foram adicionados o evento de click, quando o evento for executado a função "setIsChecked" será chamada.

2. A função "setIsChecked" irá alterar o estado da tarefa no localStorage e também chamar a função "changeIsCheckedState".

3. A função "changeIsCheckedState" irá adicionar uma classe "checked" na tarefa que for clicada, assim se a tarefa contiver a classe "checked" será adicionada na lista de tarefas feitas, se não contiver a classe irá se manter na lista de tarefa para fazer ou retornar para essa lista.

### Ao abrir o projeto
Há uma função chamada "getTasks" que assim que a página do projeto for aberta, essa função irá prucurar no LocalStorage todas as tarefas salvas no LocalStorage junto com seus estados, e após isso as tarefas serão adicionadas de acordo com a última maneira que se encotrava da última vez que a página foi aberta.