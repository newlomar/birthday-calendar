window.onload = () => {
  if (JSON.parse(localStorage.getItem("people"))) {
    JSON.parse(localStorage.getItem("people")).forEach((item) => {
      addRowToTable(item.name, item.birthDate);
    });
  }
};

const form = document.querySelector("[data-js='form']");
const datePicker = document.querySelector("[data-js='date-picker']");

datePicker.max = new Date()
  .toLocaleDateString()
  .replace(/\//g, "-")
  .split("-")
  .reverse()
  .join("-");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const nameInput = document.querySelector("[data-js='nameInput']");
  const newPerson = {
    name: event.target.elements["name"].value,
    birthDate: event.target.elements["birthDate"].value
      .split("-")
      .reverse()
      .join("/"),
  };
  const peopleArray = JSON.parse(localStorage.getItem("people")) || [];

  peopleArray.push(newPerson);
  localStorage.setItem("people", JSON.stringify(peopleArray));
  addRowToTable(newPerson.name, newPerson.birthDate);

  event.target.reset();
  nameInput.focus();
}

function addRowToTable(name, birthDate) {
  const tBody = document.querySelector("[data-js='tbody']");
  const tr = document.createElement("tr");
  const tdName = document.createElement("td");
  const tdBirthDate = document.createElement("td");
  const tdButton = document.createElement("td");
  const button = document.createElement("button");

  button.addEventListener("click", handleClick);

  tdName.textContent = name;
  tdBirthDate.textContent = birthDate;
  button.textContent = "Editar";
  tdButton.appendChild(button);
  tr.appendChild(tdName);
  tr.appendChild(tdBirthDate);
  tr.appendChild(tdButton);

  tBody.appendChild(tr);
}

function handleClick() {
  this.textContent = this.textContent === "Editar" ? "Salvar" : "Editar";
  const newNameInput = document.createElement("input");
  const newDateInput = document.createElement("input");

  newNameInput.className = "form-field js-field";
  newNameInput.type = "text";
  newNameInput.minLength = "3";
  newNameInput.maxLength = "120";
  newNameInput.pattern = "^[a-zA-Z ]*$";
  newNameInput.required = true;

  newDateInput.className = "form-field js-field";
  newDateInput.type = "date";
  newDateInput.placeholder = "dd-mm-yyyy";
  newDateInput.min = "1900-01-01";
  newDateInput.max = "2022-04-27";
  newDateInput.required;

  this.parentNode.parentNode.children[0].textContent = "";
  this.parentNode.parentNode.children[0].appendChild(newNameInput);

  this.parentNode.parentNode.children[1].textContent = "";
  this.parentNode.parentNode.children[1].appendChild(newDateInput);

  const saveButton = document.createElement("button");
  saveButton.textContent = "Salvar";
  saveButton.addEventListener("click", function () {
    const peopleArray = JSON.parse(localStorage.getItem("people")) || [];

    peopleArray[this.parentNode.parentNode.rowIndex - 1].name =
      this.parentNode.parentNode.children[0].children[0].value;

    peopleArray[this.parentNode.parentNode.rowIndex - 1].birthDate =
      this.parentNode.parentNode.children[1].children[0].value
        .split("-")
        .reverse()
        .join("/");

    localStorage.setItem("people", JSON.stringify(peopleArray));

    this.parentNode.parentNode.children[0].textContent =
      this.parentNode.parentNode.children[0].children[0].value;

    this.parentNode.parentNode.children[1].textContent =
      this.parentNode.parentNode.children[1].children[0].value
        .split("-")
        .reverse()
        .join("/");

    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.addEventListener("click", handleClick);
    this.parentNode.parentNode.children[2].appendChild(editButton);
    this.parentNode.parentNode.children[2].removeChild(this);
  });
  this.parentNode.parentNode.children[2].appendChild(saveButton);

  this.parentNode.parentNode.children[2].removeChild(this);
}
