# to-do-list-challenge

## Informações Gerais

O projeto consiste numa lista de tarefas (*To-do List*) desenvolvida utilizando HTML, CSS e JavaScript.

## Funcionalidades Principais

- Para adicionar uma tarefa à lista, o usuário deve inserir o nome/descrição da tarefa e, como requisito adicional, pode informar a data limite/prazo para finalização da tarefa (se houver).
- Na lista de tarefas, ao clicar no botão 'Adicionar Tarefa', esta é adicionada à lista preenchida com status inicial 'A fazer'.
- Ao clicar tanto no nome/descrição quanto no status da tarefa, seu estado muda de 'A fazer' para 'Feito' e vice-versa.
- Cada tarefa tem um botão 'Deletar' caso seja necessário remover determinada tarefa da lista.

## Especificações/Funcionalidades Técnicas

- Para armazenar as propriedades de cada tarefa foi utilizada uma classe denominada *Task*, que armazena sua decrição, seu status e seu prazo.
- Um array denominado *taskList* é responsável por armazenar as tarefas adicionadas, sendo possível armazenar quantas tarefas o usuário desejar.
- A lista de tarefas é exibida na tela por meio de uma tabela na qual cada linha contém 4 campos: Tarefa (com o nome/descrição da tarefa), Status (A fazer/Feito), Prazo e um último com um botão para remoção.
- A tabela em seu estado inicial, quando não existem tarefas cadastradas, ou quando todos os itens são deletados da lista, é preenchida com a frase 'Não existem tarefas registradas!'
- Ao adicionar uma tarefa, o programa espera 2 segundos para exibi-la na tela.
- A lista de tarefas é armazenada no *local storage* a cada tarefa adicionada e é atualizado sempre que alguma tarefa é deletada ou quando o status de alguma tarefa é alterada, dessa forma ao recarregar a página ou fechá-la e abri-la novamente a lista permanece em seu último estado.
* Para manipular as tarefas, foram criadas 5 funções principais:
1) addTask(): cria um novo objeto *Task* e o adiciona tanto na lista quanto no HTML em forma de tabela;
2) createTaskRow(): cria um elemento de linha de tabela em formato HTML;
3) addEvListeners(): adiciona os event listeners de *onclick* à tarefa, usados para alterar o status ou deletar a tarefa;
4) changeStatus(): altera o status da tarefa (A fazer/Feito);
5) deleteTask(): remove a tarefa da lista.
* Visando otimização, as tarefas são adicionadas ao HTML de duas formas:
1) Ao recarregar/reabrir a página, as tarefas já existentes (armazenadas no *local storage*) são inseridas na variável *tableContent* já em formato HTML e são incluídas no HTML através da propriedade *innerHTML*, visto que nesse caso todas as tarefas precisam ser renderizadas.
2) Quando uma nova tarefa é adicionada, esta é criada através do método *createElement()* e é adicionada através do método *appendChild()*, pois esse método renderiza na tela apenas o elemento adicionado, otimizando a aplicação (caso o *innerHTML* fosse utilizado todas as tarefas, incluindo as já presentes na tela, seriam renderizadas novamente pois todas estão contidas num mesmo elemento pai dentro da tabela).
- A função *createTaskRow()*, ao invés de criar o status sempre como 'A fazer', utiliza o status do objeto criado pela classe *Task*. Uma nova tarefa deve sempre ter o estado inicial 'A fazer', porém mesmo na criação da tarefa o estado é definido pelo atributo do objeto ao invés de mantê-lo *hardcoded* com 'A fazer' para evitar futuros problemas caso existam mudanças na função ou na aplicação no geral.
- A função *addEvListeners()* foi desenvolvida tendo em vista que os event listeners são adicionados tanto no método *createTaskRow()* quanto ao recarregar a página via *innerHTML*, evitando código duplicado.
- Visto que é possível adicionar prazo às tarefas, pode ocorrer de duas tarefas terem o mesmo nome, porém prazos diferentes. Dessa forma, a remoção de tarefas foi feita através de IDs (que correspondem à posição do item no array), pois se a tarefa fosse deletada comparando seu nome vindo do HTML com os nomes presentes no array isso geraria problemas caso existissem nomes repetidos. Portanto cada tarefa é removida conforme seu ID (que é único), e após as tarefas subsequentes tem seu ID decrescido de 1 para manter a ordem após a remoção.

## Layout da aplicação

- O programa foi desenvolvido aplicando o conceito de *Mobile First*, a aplicação foi desenvolvida primeiramente com um layout para mobile e após foi ajustada para telas maiores usando *flexbox* para ajustar os campos na tela.

## Melhorias/Futuras Implementações

- Adicionar validação no campo 'Tarefa': após clicar no botão 'Adicionar Tarefa', caso o campo esteja em branco, a tarefa não é adicionada e uma mensagem é exibida pedindo para informar um nome à tarefa (no momento o programa não impede adição de tarefas sem nome).
- Adicionar validação em conjunto relativa aos campos 'Tarefa' e 'Prazo': após clicar no botão 'Adicionar Tarefa', caso o programa encontre uma tarefa já adicionada com a mesma descrição e mesmo prazo, a tarefa não é adicionada e uma mensagem informa que a tarefa já existe para evitar duplicatas.
- Adicionar um botão para editar as informações da tarefa (como descrição e prazo), assim o usuário não precisa remover a tarefa e adicioná-la novamente caso deseje editá-la.

## Publicação do Projeto

- O projeto foi publicado através do GitHub Pages podendo ser acessado por esse link: https://marcelostrackdaros.github.io/to-do-list-challenge/
