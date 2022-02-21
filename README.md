<div align="center">
<h1>To-do List Challenge</h1>
</div>

Autor: José Otavio Pires de Carvalho

<a href="https://github.com/joseotaviopc/" target="_blank">![  ](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)</a> 
<a href="https://www.linkedin.com/in/jose-otavio-pires-de-carvalho/" target="_blank">![  ](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)</a>
<a href="mailto:carvalho.jose@gmail.com" target="_blank">![  ](https://img.shields.io/badge/Gmail-D14836?style=flat&logo=gmail&logoColor=white)</a><br>

## Índice

- [Descrição](#descricao)
- [Tecnologias utilizadas](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Demonstração](#demonstracao)
- [Lógica Utilizada](#logica)
- [Conclusão](#conclusao)

<br>

<h2 id="descricao">Descrição</h2>

Um simples gerenciador de tarefas (to-do list).
<br>

<h2 id="tecnologias">Tecnologias utilizadas</h2>

![Html](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)  ![Css](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![Javascript](https://img.shields.io/badge/JavaScript-323330?style=flat&logo=javascript&logoColor=F7DF1E)

<br>

<h2 id="funcionalidades">Funcionalidades</h2>

>
- As tarefas podem ser criadas clicando no botão <code>Criar</code> ou ao apertar <code>Enter</code> após se digitar o nome da tarefa.
- A tarefa fica marcada como *feita* e vai para o final da lista quando se clica em cima do nome.
- Ao se clicar em alguma tarefa *feita* ela volta para o início da lista como *não feita*.
- Podem ser criadas quantas tarefas quiser.
- Ao voltar para o site, as tarefas são carregadas automaticamente.
- Pode-se filtrar as tarefas *feitas* e *não feitas*.
- Pode-se mudar para o tema escuro.
- Responsivo.

<br>

<h2 id="demonstracao">Demonstração</h2>

Aplicativo funcional está disponível no link: <a href="https://to-do-list-challenge-joseotaviopc.vercel.app/" target="_blank">To-do List</a>

<br>

<h2 id"logica">Lógica utilizada para a resolução</h2>

Foi utilizada o <code>localStorage</code> para guardar os dados localmente e serem recuperados na próxima visita a página.

O código javascript foi dividido em funções específicas, como adicionar tarefa, ler dados do <code>localStorage</code>, etc.

<br>

<h2 id="conclusao">Conclusão</h2>

Foram concluidos todos os requisitos obrigatórios do desafio, e muitos outros opcionais.

Além disso foram deixadas algumas [sugestões](#sugestões-adicionais) para novas implementações.

<br>

### *Requisitos Obrigatórios*
>
- [x] Utilizar JS, HTML e CSS puro, ou seja sem qualquer tipo de biblioteca ou framework
- [x] A solução deve apresentar um campo para inserir o nome da tarefa a ser feita e um botão para adicionar a tarefa a lista
- [x] Ao adicionar um elemento novo a lista esperar 2 segundos para que esse elemento seja exibido.
- [x] Cada elemento da lista deverá apresentar 2 estados diferentes, um pra item a se fazer e um para item feito
- [x] Ao clicar no item da lista o mesmo deve mudar se estado, feito => a fazer ou a fazer => feito
- [x] Deve ser possível armazenar quantos item o usuário quiser a lista
- [x] Criar uma boa documentação para a solução (README).
- [x] A lista deve ser armazenada de uma forma que se o usuario entrar novamente na pagina ele poderá ver todos os itens ja cadastrados e seus respectivos estados
- [x] A solução deve apresentar uma lista para listar as tarefas

<br>

### *Requisitos Opcionais (Plus)*
>
- [x] Implementar uma boa interface gráfica para a solução
- [x] Tarefas inseridas com o teclado (Enter)
- [x] Validação se a tarefa possui algum caractere
- [x] Tarefas concluídas ficam no final da lista
- [x] Ler dia da semana e mostrar na tela
- [x] Publicar a aplicação em algum ambiente
- [x] Site responsivo
- [x] Tema escuro

<br>

### *Sugestões adicionais*
>
- [ ] *Em cada elemento da lista apresentar um botão de deletar e caso o usuário aperte esse botão o item some da lista* - **Em andamento**
- [ ] *Implementar uma solução otimizada*
- [ ] *Editar as tarefas listadas*
- [ ] *Colocar data inicial e prazo nas tarefas*
- [ ] *Mostrar tarefas atrasadas/próximas do prazo*

<br>

![Linhas](https://img.shields.io/tokei/lines/github.com/joseotaviopc/to-do-list-challenge) <a href="https://validator.w3.org/nu/?doc=https%3A%2F%2Fto-do-list-challenge-ten.vercel.app%2F" target="_blank">![w3c](https://img.shields.io/w3c-validation/html?targetUrl=https%3A%2F%2Fto-do-list-challenge-ten.vercel.app%2F)</a>

