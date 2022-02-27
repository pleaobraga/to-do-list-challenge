# Readme (:brazil:)
# Lets Code - WebFullStack Módulo 5: JS Vanilla
# <i>To-do-list challenge</i>

## Proposta do Teste

Criar uma <i>to-do list</i> que consiste em adicionar elementos a uma lista e poder marcá-los como pendente ou concluído.

Link de acesso: [<i>To-do List</i> Franco Moraes]()

### Requisitos obrigatórios:
- Utilizar JS, HTML e CSS puros, ou seja, sem frameworks ou bibliotecas
- Apresentar um campo para inserir o nome da tarefa e um botão para adicionar a tarefa à lista
- Ao adicionar uma nova tarefa:
  - Aguardar 2 segundos para que seja adicionada à lista
  - Deve vir por padrão no estado "pendente"
- Cada elemento deve apresentar 2 estados diferentes ("pendente" e "concluído") 
- Ao clicar no item da lista, deverá ocorrer troca de estado: pendente <=> concluído
- A lista deve ser armazenada de maneira que os itens já cadastrados e seus respectivos estados sejam mantidos caso a página seja recarregada
- Criar documentação (readme)

### Implementações adicionais:
- Adicionar elemento pressionando a tecla "enter"
- Botão para excluir tarefa
- Interface gráfica
- Aplicação disponível no GitHub Pages

### Implementações futuras:
- Possibilidade de editar tarefa já adicionada
- Aparecer "processando" enquanto o usuário aguarda os 2 segundos
- Contador de tarefas pendentes e concluídas
- Enviar tarefas concluídas para o final da lista
- Filtro de exibição de tarefas pendentes e concluídas

## Utilização
1.  Adicionar nova tarefa:
    1.  Clicar no campo "Nova Tarefa"
    2.  Digitar a tarefa
    3.  Clicar no "+" ou pressionar a tecla "enter"
    4.  Aguardar 2 segundos para que a tarefa seja adicionada à lista
    5.  Repetir os passos 1 a 4 quantas vezes quiser
2.  Clicar no campo da tarefa, ou sobre ela, para alterar o estado de pendente para concluída, e vice-versa
3.  Clicar no botão com o ícone da lixeira para excluir a tarefa

## Implementação

### Estrutura do código

A estrtutura da solução consiste em um arquivo html, um arquivo de script e dois arquivos de estilo (sendo um deles o reset.css).

O arquivo html contem os dados iniciais da solução, com um campo input para inserção de novas tarefas, botão de adicionar e uma lista vazia, exceto pelo título "Lista de Tarefas".

No arquivo script o código foi organizado na maior parte em funções, cada uma com objetivos específicos, a exemplo: adicionar itens novos, armazenar informações na localStorage, recuperar informações da localStorage, criar elementos html, aplicar as informações da localStorage aos elementos criados.

Por fim, o arquivo CSS contem a estrutura para criar uma interface mais amigável ao usuário, com especificações para as bordas e as cores dos elementos, também os espaçamentos entre elementos e alteração do cursor para pointer ao sobrepor os botões.

### Aprendizados

Para elaborar esta solução, foi necessário pesquisar sobre alguns temas, a saber:

- CSS Flex-box
- Função assíncrona setTimeout
- Método addEventListener
- Utilização de seletores
  - querySelector
  - querySelectorAll
  - childNodes[index] / lastChild / firstChild
- Armazenamento local:
  - localStorage.setItem()
  - localStorage.getItem()
  - JSON.stringfy
  - JSON.parse
- Métodos de array
  - Apply
  - Map
  - Split
<hr>

## Autor

Franco Moraes <br>
[![GitHub](https://i.stack.imgur.com/tskMh.png)]() [GitHub](https://github.com/francomoraes) <br>
[![LinkedIn](https://i.stack.imgur.com/gVE0j.png)]() [LinkedIn](https://www.linkedin.com/in/francomoraes/)