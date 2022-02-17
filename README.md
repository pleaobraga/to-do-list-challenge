# Projeto Módulo 5

## Leandro Vendemiatto Antunes

Este projeto consiste em criar uma to-do list onde se pode adicionar 
elementos a uma lista e poder marcá-los como feito ou não.

A aplicação foi feita em HTML, CSS e Javascript puro, ou seja, sem qualquer tipo 
de biblioteca ou framework.

## Como utilizar

Abra o link do projeto ou abra o arquivo index.html.

Digite uma tarefa no campo e clique no botão "Adicionar Tarefa" para que ela 
seja adicionada na lista.

Adicione quantas tarefas forem necessárias.

Clique na tarefa para mudar o status dela de "a fazer" para "feito" (o status
é somente visual, mudando a cor para verde e trocando a bolinha da lista por um
simbolo de "check").

Caso a precise voltar o status de "feito" para "a fazer" devolta, é só clicar 
novamente em cima da tarefa.

Clique no botão "Remover" para apagar aquela tarefa da lista.

## A solução do problema

Para adicionar as tarefas a lista, foi criado uma função com evento de click que 
cria elementos de tabela e de lista e adiciona ao DOM. Neste evento foi 
implementado um setTimeout() para a lista aparecer depois de 2 segundos da 
chamada do evento.

Foi criado um botão "Remover", como um plus para o projeto que também tem um 
evento de click que remove da lista a tarefa já inserida.

Para mudar o status da lista para "feito" e "a fazer", ou vice e versa, foi 
criado um evento de click que adicina ou remove uma classe no elemento HTML.

Para que a lista não se perdesse quando o usuário saísse da página, foi 
implementado no script um localStorage.setItem() que possibilita salvar 
localmente os dados.
