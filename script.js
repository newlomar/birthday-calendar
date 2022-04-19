const form = document.querySelector("[data-js='form']");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const nameInput = document.querySelector("[data-js='nameInput']");

  console.log(event.target.elements["name"].value);
  console.log(event.target.elements["birth-date"].value);

  event.target.reset();
  nameInput.focus();
}
