// Criei essas classes com variaveis do tipo static para que essas classes n tenham a necessidade de serem instanciadas.
// O intuito disso era ganhar praticidade na manutenabilidade. Caso houvesse uma mudanca que impactaria no valor que checked ou unchecked fossem receber, ou seja, passassem a ser numeros. Eu faria a alteracao em apenas um lugar para mudar de todos.
export class STATUS {
  static checked = "checked";
  static unchecked = "unchecked";
}

export class LIST {
  static todo = "todoList";
}
