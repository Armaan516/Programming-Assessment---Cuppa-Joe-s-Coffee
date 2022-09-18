// Startup Menu variables
let startBtns = document.getElementById("startBtns");
let pickupBtn = document.getElementById("pickupBtn");
let deliveryBtn = document.getElementById("deliveryBtn");
let error = document.getElementById("error");

// Pickup and delivery variables
let pickup = document.getElementById("pickup");
let delivery = document.getElementById("delivery");
let pickupName = document.getElementById("pickupName");
let deliveryName = document.getElementById("deliveryName");
let address = document.getElementById("address");
let phone = document.getElementById("phone");

// Other variables
let totalCost = 0;

// Function hides previous section and shows new section
function changeSection(hide, show) {
  hide.classList.add("hide");
  show.classList.remove("hide");
  error.innerHTML = "";
}

// If input is empty then the error message is outputted, otherwise the program continues
function checkEmptyTextEntries(userInput, errorText) {
  let errorMessage = "";
  if (userInput == "") {
    errorMessage = errorText;
    error.innerHTML = errorMessage;
    return false;
  } else return userInput;
}

// Runs when the pickup button is clicked
pickup.addEventListener("submit", function (e) {
  e.preventDefault(); // prevents data from being sent elsewhere
  error.innerHTML = ""; //resets error message
  // Function is run to check for empty input, if so then an error message is outputted and the user has to resubmit their answer
  let nameEntered = pickupName.value;
  nameEntered = checkEmptyTextEntries(nameEntered, "Please enter your name");
  if (!nameEntered) {
    return;
  }
})

// Runs when the delivery button is clicked
delivery.addEventListener("submit", function (e) {
  e.preventDefault();
  error.innerHTML = "";
  // Validating to make sure name input is not empty
  let nameEntered = deliveryName.value;
  nameEntered = checkEmptyTextEntries(nameEntered, "Please enter your name");
  if (!nameEntered) {
    return;
  }
  // Validating to make sure address input is not empty
  let addressEntered = address.value;
  addressEntered = checkEmptyTextEntries(addressEntered, "Please enter your address");
  if (!addressEntered) {
    return;
  }
  // Validating to make sure phone number input is not empty
  let phoneEntered = phone.value;
  phoneEntered = checkEmptyTextEntries(phoneEntered, "Please enter your phone number");
  if (!phoneEntered) {
    return;
  }
  totalCost+=5;
})



