# to-do-list-challenge

## Autoria

Gabriela Pantaleão Nascimento - Projeto final do módulo 5 da Let's Code Web Full Stack Degree

## Proposta

Este projeto consiste em criar uma To Do List, permitindo:
- a criação de tasks via input do usuário;
- alterar o status da tarefa de 'to-do' para 'done' e de 'done' para 'to-do';
- exclusão de tarefas.


## Como utilizar

- Abra o [link](https://nascimeg.github.io/to-do-list/);
- Digite uma nova task no campo para input em 'Add new task here';
- Adicione esta task à lista de 'to-do' clicando no botão 'Add' que muda de cor ao passar o mouse por cima, note que demora 2 segundos para que a task seja de fato incluída;
- Para mover a task para o status 'done', clique no quadradinho branco que é uma checkbox, note que não há espera de 2 segundos, a mudança é instantânea. Note também que ao mudar para o status 'done' a task fica fiscada e mais apagada em relação à página, pois não é mais o foco e não deve chamar atenção apesar de ainda ser visível;
- Para mover uma task com status 'done' para o status 'to-do', clique novamente na checkbox que não está mais branca. Note que a mudança de status é instantânea e que a formatação da task volta ao que era;
- Para deletar uma task independente de seu status, clique no botão 'Delete' que muda de cor ao passar o mouse por cima, note que a task some instantâneamente.


## Lógica de resolução do problema

1) Utilizando os conceitos DOM, foram definidas no script as variáveis dos elementos da página (nova task, botão para adicionar nova task, to do e done);
2) Foram criadas as funções para incluir novas tasks, que:
   - ao criar uma nova task cria uma linha no HTML incluindo o input do usuário, uma checkbox em branco e um botão delete como filhas da linha;
   - a função 'add' fará com que a linha criada da nova task no passo anterior e suas filhas, seja incluída ao status 'to-do' após 2 segundos;
   - o botão 'Add' quando clicado está associado à função 'add', ou seja, quando clicar no botão, o passo anterior ocorrerá;
   - Ao clicar no botão 'Add', mesmo demorando 2 segundos para a task aparecer no status 'to-do', o campo para inserir uma nova task já é limpo instantâneamente para que o usuário não clique novamente no botão 'Add' achando que não funcionou (o delay de 2 segundos para incluir no status 'to-do' é um pré-requisito da atividade)
3) Foram criadas as funções que definem mudanças no status da task e até sua existência definido por clicks triggered pela ação do usuário:
   - primeiro foi definido o input checkbox e associado qualquer mudança nele às funções relacionadas a status e também foi definido o botão delete, associando um clique nele à função também descrita depois;
   - depois foi criada a função em que uma task 'to-do' (ela começa assim por default) muda seu status para 'done', ela puxa a linha com todos os elementos para o outro status, de forma que um click na checkbox faça com que a função anterior "puxe" a linha novamente para o status 'to-do';
   - a função to-do segue a mesma lógica da função anterior porém invertendo os status, logo, uma task que encontra-se como done voltaria para o status 'to-do' e dentro desta função tem a lógica que mais um click na checkbox ative a fórmula anterior;
   - por fim temos a função delete que puxa todo o node do elemento pai (ul) e depois remove o filho da 'ul', remove todos os elementos que tem na linha (input da task, checkbox e botão delete).
4) Em relação ao estilo da página:
   - é um site responsivo;
   - as cores foram definidas por escolha da dev puramente por preferência;
   - foi optado por dar destaque à nova task deixando-a logo abaixo do título, logo em seguida as tasks com status 'to do' com uma fonte que da contraste com o fundo da página justamente para trazer atenção para estas tasks e por último as tasks com status 'done' para ter um histórico, porém com a task 'riscada' indicando que foi feita e uma cor com menos contraste pois ela não deve mais ser o foco de atenção do usuário;
   - foi optado também por separar os diferentes status com uma linha mais grossa e com maior contraste e separar as tasks uma das outras também por uma linha, meramente por organização, porém a linha e o contraste é menor do que as que separam os status;
   - foi escolhido que um placeholder para o input ao invés de um header e que a borda do input fosse arredondada (preferências da dev);
   - buscando uma interface mais 'friendly' para o usuário, foi definido que os botões (add e delete) mudariam de cor ao passar o mouse em cima de forma que o botão se destacasse indicando sua função (foi associado vermelho para excluir uma task e verde para incluir);
   - no scprit é puxado o parentNode dentro das funções que alteram o status da task para terem as formatações específicas de cada status via CSS utilizando classes.

## Melhorias

- Armazenar no localStorage o histórico de novas tasks e ações tomadas pelo usuário, para que quando o mesmo saia e retorne a página, não perca suas tasks e evolução das mesmas (funções iniciadas no código, porém não funcionam no momento);
- Incluir botão e funcionalidade para editar as tasks ao invés de deletar e refazer;
- Ajustes no HTML para que o site seja user friendly qualquer usuário (foco em usuários com deficiência).
