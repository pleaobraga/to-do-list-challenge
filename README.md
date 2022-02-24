# to-do-list-challenge

## Informações Gerais

O projeto consiste numa lista de tarefas ('To-do List') desenvolvida utilizando HTML, CSS e JavaScript.

## Funcionalidades Principais

- Para adicionar uma tarefa à lista, o usuário deve inserir o nome/descrição da tarefa e, como requisito adicional, pode informar a data limite/prazo para finalização da tarefa (se houver).
- Na lista de tarefas, ao clicar no botão 'Adicionar Tarefa', esta é adicionada à lista preenchida com status inicial 'A fazer'.
- Ao clicar tanto no nome/descrição quanto no status da tarefa, o status muda de 'A fazer' para 'Feito' e vice-versa.
- Cada tarefa tem um botão 'Deletar' caso seja necessário remover determinada tarefa da lista.

## Especificações/Funcionalidades Técnicas

- Para armazenar as propriedades de cada tarefa foi utilizada uma classe denominada 'Task', que armazena sua decrição, seu status e seu prazo.
- Um array denominado 'taskList' é responsável por armazenar as tarefas adicionadas, sendo possível armazenar quantas tarefas o usuário desejar.
- A lista de tarefas é exibida na tela por meio de uma tabela na qual cada linha contém 4 campos: Tarefa (com o nome/descrição da tarefa), Status (A fazer/Feito), Prazo e um último com um botão para remoção.
- A tabela em seu estado inicial, quando não existem tarefas cadastradas, ou quando todos os itens são deletados da lista, é preenchida com a frase "Não existem tarefas registradas!"
- Ao adicionar uma tarefa, o programa espera 2 segundos para exibi-la na tela.
- A lista de tarefas é armazenada no local storage a cada tarefa adicionada e é atualizado sempre que alguma tarefa é deletada ou quando o status de alguma tarefa é alterado, dessa forma ao recarregar a página ou fechá-la e abri-la novamente a lista permanece em seu último estado.
* Para manipular as tarefas, foram criadas 5 funções principais:
- addTask(): cria um novo objeto 'Task' e o adiciona tanto na lista quanto no HTML em forma de tabela;
- createTaskRow(): cria um elemento de linha de tabela em formato HTML;
- addEvListeners(): adiciona os event listeners de 'onclick' à tarefa, usados para alterar o status ou deletar a tarefa;
- changeStatus(): altera o status da tarefa (A fazer/Feito);
- deleteTask(): remove a tarefa da lista.
* Visando otimização, as tarefas são adicionadas ao HTML de duas formas:
- Ao recarregar/reabrir a página, as tarefas já existentes (armazenadas no local storage) são inseridas na variável 'tableContent' já em formato HTML e são incluídas no HTML através da propriedade 'innerHTML', visto que nesse caso todas as tarefas precisam ser renderizadas.
- Quando uma nova tarefa é adicionada, esta é criada através do método 'createElement()' e é adicionada através do método 'appendChild()', pois esse método renderiza na tela apenas o elemento adicionado, otimizando a aplicação (caso o 'innerHTML' fosse utilizado todas as tarefas, incluindo as já presentes na tela, seriam renderizadas novamente pois todas estão contidas num mesmo elemento pai dentro da tabela).
- A função 'createTaskRow()', ao invés de criar o status sempre como 'A fazer', utiliza o status do objeto criado pela classe 'Task'. Uma nova tarefa deve sempre ter o status inicial 'A fazer', porém mesmo na criação da tarefa o status é definido pelo atributo do objeto ao invés de mantê-lo 'hardcoded' com 'A fazer' para evitar futuros problemas caso existam mudanças na função ou na aplicação no geral.
- A função 'addEvListeners()' foi desenvolvida tendo em vista que os event listeners são adicionados tanto no método 'createTaskRow()' quanto ao recarregar a página via 'innerHTML', evitando código duplicado.

## Layout da aplicação

- O programa foi desenvolvido aplicando o conceito de Mobile First, a aplicação foi desenvolvida primeiramente com um layout para mobile e após foi ajustado para telas maiores.

## Melhorias/Futuras Implementações

- Adicionar um botão para editar as informações da tarefa (como descrição e prazo), assim o usuário não precisa remover a tarefa e adicioná-la novamente caso deseje editá-la.