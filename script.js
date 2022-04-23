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
    birthDate: new Date(
      event.target.elements["birthDate"].value
    ).toLocaleDateString(),
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

  button.addEventListener("click", function () {
    this.parentNode.parentNode.children[0].textContent = "";
    this.parentNode.parentNode.children[0].appendChild(
      document.createElement("input")
    );
    this.parentNode.parentNode.children[1].textContent = "";
    this.parentNode.parentNode.children[1].appendChild(
      document.createElement("input")
    );
  });

  tdName.textContent = name;
  tdBirthDate.textContent = birthDate;
  button.textContent = "Edit";
  tdButton.appendChild(button);

  tr.appendChild(tdName);
  tr.appendChild(tdBirthDate);
  tr.appendChild(tdButton);
  tBody.appendChild(tr);
}
