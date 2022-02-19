# to-do-list-challenge

## Renan Fayad - Projeto Módulo 5 - Front End Dinâmico - Web Full Stack - Let's Code
- Este projeto consiste em criar uma to-do list, permitindo a criação e inserção de tarefas, a alteração de seus respectivos status (feita ou não) e a exclusão de cada tarefa.
- A aplicação é baseada apenas HTML, CSS e JS, sem bibliotecas ou frameworks.
- O projeto foi desenvolvido de forma a trazer uma **solução responsiva**.

## Como utilizar

1. Abra o [link](https://rrfayad.github.io/to-do-list-challenge/index.html#)
2. Insira a tarefa desejada no campo "Insira sua tarefa aqui"
3. Adicione a tarefa à lista, clicando no botão '+' ou apertando Enter;
   * Note que caso o campo esteja vazio, será disparado um alerta e a tarefa não será adicionada;
4. Aguarde 02 e segundos e...
5. Voilá! Sua tarefa foi adicionada à lista.
6. Para cada tarefa, há 02 possíveis ações, sendo:  
   * Alterar status da tarefa para feita (e alterar de volta para não feita):  
   * - Para isso, basta clicar em cima de cada tarefa (note que o mouse muda de forma no espaço 'clicável');  
   * Deletar tarefa da lista:  
   * - Para deletar, basta clicar no botão com uma lixeira ao lado de cada tarefa.  
7. Por fim, fique tranquilo, pois mesmo que feche o navegador, as tarefas (e seu respectivo status) se manterão em sua lista!

## A solução do problema

1. Foram criadas no script as constantes dos elementos da página (conceito DOM).

2. Foram criadas as principais funções para execução da ferramenta, sendo:  
    - saveData: salva as informações da lista de tarefas (copiando o innerHTML) no localStorage;  
    - createWrapper: cria (e retorna) um elemento div ('wrapper') no HTML;  
    - createTask: cria (e retorna) um elemento de lista no HTML, sendo que:  
    * - Recebe o valor do input;
    * - É adicionado um eventListener para que, em cada clique, altere o status para tafera feita, ou desfaz esta ação (por meio da inclusão de uma classe que altera visualmente o item, incluindo strikeThrogh quando feita) e execute saveData;  
    - createDelBtn: cria (e retorna) um botão, que tem um eventListener para Clique, que:
    * - executa a função de remover o parentNode (que será o respectivo wrapper contendo uma tarefa)
   * - executa saveData;
   - addTask: verifica se há informação no campo tarefa (se não houver retorna um alerta) e, consumindo as quatro funções descritas acima, vai:
   * - criar elemento wrapper (createWrapper);
   * - criar nova tarefa (createTask);
   * - criar o botão de delete (createDelBtn);
   * - organizar tarefa e botão de deletar dentro do wrapper;
   * - adicionar um temporizador para aguardar 02 segundos para a adição de uma tarefa à lista;
   * - salvar as informações com saveData.

3. Cada vez que a página é iniciada, para o funcionamento de todos elementos, são executadas os seguintes algoritmos:
   - É copiada a lista de tarefas do usuário, a qual está salva como um item HTML no localStorage;
   - Cada botão de deletar existente na página (de tarefas já salvas) recebe um eventListener de clique para seu funcionamento (deletar tarefa e salvar);
   - Cada Tarefa da lista (de tarefas já salvas) recebe um eventListener de clique para seu funcionamento (alterar status e salvar);
   - O Botão de Input (+) recebe um eventListener de clique para seu funcionamento (executar addTask);
   - O campo de Input recebe um eventListener de keypress, para seu funcionamento (executar addTask) quando o usuário aperte Enter
    
4. Com relação ao estilo cabe ressaltar que:
 - O projeto foi desenvolvido com responsividade, buscando as melhores adequações aos diferentes devices;
 - Foram observados itens de usabilidade, como mensangem no campo de input ao longo do processamento;
 - Efeitos visuais quando passamos o mouse por cima de determinados itens (se aplicável)
