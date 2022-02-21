import { STATUS } from "./enum.js";

export class Task {
  #taskID;
  constructor(description, id, status = STATUS.unchecked) {
    if (description.trim() === "") {
      throw new Error("Cannot add a new task withouth a description");
    } else {
      this.description = description;
    }
    this.#taskID = id;
    this.status = status;
  }

  get getID() {
    return this.#taskID;
  }

  get getStatus() {
    return this.status;
  }

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
