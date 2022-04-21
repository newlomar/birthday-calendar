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

  console.log(event.target.elements["name"].value);
  console.log(event.target.elements["birth-date"].value);

  event.target.reset();
  nameInput.focus();
}
