const funcStorage = {
  get(){
      return JSON.parse(localStorage.getItem("list")) || []
  },
  set(list){
      localStorage.setItem("list", JSON.stringify(list))
  }
};

const addButton = document.querySelector("#btn-to-add");

let localStorageList = funcStorage.get()

localStorageList.forEach(element => {
  elementHTML(element)
});

function elementHTML(toAddValue) {
  setTimeout(() => {
    
    const listAll = document.querySelector("#container-new-list");
  
    const newList = document.createElement("li");
    newList.classList.add("new-list");
    listAll.appendChild(newList);
  
    const btn = document.createElement("button");
    const buttonX = document.createTextNode("X");
    btn.classList.add("delete");
    newList.appendChild(btn);
    btn.appendChild(buttonX);
    btn.addEventListener("click", () => {
      btn.parentNode.parentNode.removeChild(newList);
      const nodeText = btn.parentNode.childNodes[2];

      let comparisonList = [];
      comparisonList.push(nodeText.data);
      const index = localStorageList.indexOf(comparisonList[0]);

      localStorageList.forEach(element =>{
        if(element === comparisonList[0]){
          localStorageList.splice(index, 1);
        };
      });
      funcStorage.set(localStorageList);
    });

    const checkbox = document.createElement("input");
    checkbox.classList.add("checkbox");
    checkbox.setAttribute("type", "checkbox");
    newList.appendChild(checkbox);
    checkbox.addEventListener("input", () => {
      checkbox.checked ? newList.classList.add("list-made") : newList.classList.remove("list-made");
    })

    const text = document.createTextNode(toAddValue);
    newList.appendChild(text);
  
    const line = document.createElement("div");
    line.classList.add("line");
    newList.appendChild(line);

  }, 2000);
}

function addList() {

  const toAdd = document.querySelector("#to-add");
    if(!toAdd.value == ""){
      
      elementHTML(toAdd.value);
  
      localStorageList.push(toAdd.value);
  
      funcStorage.set(localStorageList);
    }

  toAdd.value = "";

}

addButton.addEventListener("click", addList)
