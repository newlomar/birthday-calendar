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

  tdName.textContent = name;
  tdBirthDate.textContent = birthDate;

  tr.appendChild(tdName);
  tr.appendChild(tdBirthDate);
  tBody.appendChild(tr);
}
