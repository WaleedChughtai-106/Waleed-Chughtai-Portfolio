const display = document.getElementById("display-result");
const button = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "=%"];
let output = "";
const Calculate = (btnValue) => {
  if (btnValue == "=" && output !== "") {
    output = eval(output.replace("%", "/100"));
  } else if (btnValue === "AC") {
    output = "";
  } else if (btnValue === "DEL") {
    output = output.toString().slice(0, -1);
  } else {
    if (output == "" && specialChars.includes(btnValue)) return;
    output += btnValue;
  }
  display.value = output;
};

button.forEach((button) => {
  button.addEventListener("click", (e) => {
    Calculate(e.target.dataset.value);
  });
});
