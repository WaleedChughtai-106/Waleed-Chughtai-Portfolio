//Toggle Menu
let HamburgerIcon = document.getElementById("toggleBttn");
let CrossIcon = document.getElementById("toggleBttn2");
function ToggleMenuON() {
  let HamburgerIcon = document.getElementById("toggleBttn");
  let VerticalMenu = document.getElementById("vertical-Navbar");
  let CrossIcon = document.getElementById("toggleBttn2");
  HamburgerIcon.style.display = "none";
  VerticalMenu.style.display = "block";
  CrossIcon.style.display = "block";
}
function ToggleMenuOFF() {
  let HamburgerIcon = document.getElementById("toggleBttn");
  let VerticalMenu = document.getElementById("vertical-Navbar");
  let CrossIcon = document.getElementById("toggleBttn2");
  HamburgerIcon.style.display = "block";
  VerticalMenu.style.display = "none";
  CrossIcon.style.display = "none";
}

HamburgerIcon.addEventListener("click", ToggleMenuON);
CrossIcon.addEventListener("click", ToggleMenuOFF);
//For the Contact Form inputs
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-form");
  const nameInput = document.getElementById("Name");
  const emailInput = document.getElementById("Email");
  const phoneInput = document.getElementById("Password");
  const messageInput = document.getElementById("Message");
  const submitButton = document.querySelector(".form-submit-button");

  // Function to display error message
  function showError(input, message) {
    const existingError = input.parentElement.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    const error = document.createElement("div");
    error.className = "error-message";
    error.style.color = "red";
    error.style.fontSize = "0.7rem";
    error.style.marginTop = "0.3rem";
    error.textContent = message;
    input.parentElement.appendChild(error);
    input.style.borderColor = "red";
  }

  // Function to clear error message
  function clearError(input) {
    const existingError = input.parentElement.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }
    input.style.borderColor = "black";
  }

  function validateName() {
    const value = nameInput.value.trim();
    if (value === "") {
      showError(nameInput, "Name is required");
      return false;
    }
    if (value.length < 2) {
      showError(nameInput, "Name must be at least 2 characters long");
      return false;
    }
    clearError(nameInput);
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value === "") {
      showError(emailInput, "Email is required");
      return false;
    }
    if (!emailRegex.test(value)) {
      showError(emailInput, "Please enter a valid email address");
      return false;
    }
    clearError(emailInput);
    return true;
  }

  function validatePhone() {
    const value = phoneInput.value.trim();
    const phoneRegex = /^\+?[\d\s-]{7,15}$/;
    if (value === "") {
      showError(phoneInput, "Phone number is required");
      return false;
    }
    if (!phoneRegex.test(value)) {
      showError(
        phoneInput,
        "Please enter a valid phone number (7-15 digits, spaces, or dashes)"
      );
      return false;
    }
    clearError(phoneInput);
    return true;
  }

  function validateMessage() {
    const value = messageInput.value.trim();
    if (value === "") {
      showError(messageInput, "Message is required");
      return false;
    }
    if (value.length < 10) {
      showError(messageInput, "Message must be at least 10 characters long");
      return false;
    }
    clearError(messageInput);
    return true;
  }

  // Form submission handler
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
      alert("Form submitted successfully!");
      form.reset(); // Clear the form
    }
  });

  [nameInput, emailInput, phoneInput, messageInput].forEach((input) => {
    input.addEventListener("input", function () {
      if (input === nameInput) validateName();
      if (input === emailInput) validateEmail();
      if (input === phoneInput) validatePhone();
      if (input === messageInput) validateMessage();
    });
  });
});
//For the Live Demo Buttons for the projects
document.addEventListener("DOMContentLoaded", function () {
  const netflixButton = document.querySelector(".WorkCard1 .workCard-Bttn");
  const studySyncButton = document.querySelector(".WorkCard2 .workCard-Bttn");
  const leetcodeMetricsButton = document.querySelector(
    ".WorkCard3 .workCard-Bttn"
  );
  const simpleToDoAppButton = document.querySelector(
    ".WorkCard4 .workCard-Bttn"
  );
  const dynamicCalculatorAppButton = document.querySelector(
    ".WorkCard5 .workCard-Bttn"
  );
  const TodoAppReactButton = document.querySelector(
    ".WorkCard6 .workCard-Bttn"
  );
  netflixButton.addEventListener("click", function () {
    window.open("netflix clone by Waleed Chughtai/index.html", "_blank");
  });

  studySyncButton.addEventListener("click", function () {
    window.open("StudySyncProjectClone/StudySyncProject.html", "_blank");
  });
  leetcodeMetricsButton.addEventListener("click", function () {
    window.open("leetCode Matrics App Project/index.html", "_blank");
  });
  simpleToDoAppButton.addEventListener("click", function () {
    window.open("SimpleToDoListApp/index.html", "_blank");
  });
  dynamicCalculatorAppButton.addEventListener("click", function () {
    window.open("Dynamic Calculator/index.html", "_blank");
  });
});
