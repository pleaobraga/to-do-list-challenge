import { STATUS } from "./enum.js";

export class Task {
  #taskID;
  //Este metodo eh responsavel pela construcao do objeto, recebe 3 parametros, description que representa a descricao da tarefa, id para identificar esta tarefa das demais e status que caso nao seja preenchido ele preenche por default unchecked.
  constructor(description, id, status = STATUS.unchecked) {
    // Aqui eh feita uma validacao para o description com o intuito de nao permitir que o usuario adicione uma tarefa sem descricao.
    if (description.trim() === "") {
      throw new Error("Cannot add a new task withouth a description");
    } else {
      this.description = description;
    }
    this.#taskID = id;
    this.status = status;
  }

  //Getter que retorna o valor da propriedade privada ID
  get getID() {
    return this.#taskID;
  }

  //Getter que retorna o valor da propriedade status
  get getStatus() {
    return this.status;
  }
  //Setter responsavel por alterar o valor da propriedade status. Caso essa propriedade seja diferente de checked ou unchecked ele retorna um erro dizendo que nao aceita nenhum valor que seja diferente do checked ou unchecked
  set setStatus(value) {
    if (value === STATUS.checked) {
      this.status = value;
    } else if (value === STATUS.unchecked) {
      this.status = value;
    } else {
      throw new Error(`The property status can only receive as parameter ${STATUS.checked} or ${STATUS.unchecked}`);
    }
  }

  //Funcao responsavel por criar a estrutura HTML do item da lista
  createHtmlElement(isDarkThemeOn = false) {
    let template = `
    <li class="${isDarkThemeOn === true ? "to-do__item dark-theme" : "to-do__item"}" draggable=true>
      <div class="to-do__item-container"> 
        <input class="to-do__item-checkbox" type="checkbox" id="${this.#taskID}" ${
      this.status === STATUS.checked ? STATUS.checked : ""
    }/>
        <label class="${isDarkThemeOn === true ? "to-do__item-label dark-theme" : "to-do__item-label"}" for="${
      this.#taskID
    }"></label>
        <p ${this.status === STATUS.checked ? "class='to-do__item--grab to-do__item--checked'" : ""}>${
      this.description
    }</p>
      </div>
        <img class="to-do__item-delete" src="./Assets/Images/icon-cross.svg" alt="Um X para representar a exclusao de um item">
    </li>`;
    return template;
  }
}
