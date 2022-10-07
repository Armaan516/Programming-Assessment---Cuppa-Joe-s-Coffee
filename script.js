// Startup menu variables
let startBtns = document.getElementById("startBtns");
let pickupBtn = document.getElementById("pickupBtn");
let deliveryBtn = document.getElementById("deliveryBtn");
let error = document.getElementById("error");

// Pickup and delivery variables
let pickupOrDelivery = document.getElementById("pickupOrDelivery");
let pickup = document.getElementById("pickup");
let delivery = document.getElementById("delivery");
let pickupName = document.getElementById("pickupName");
let deliveryName = document.getElementById("deliveryName");
let address = document.getElementById("address");
let phone = document.getElementById("phone");

// Coffees required variables
let introText = document.getElementById("introText");
let coffeesRequired = document.getElementById("coffeesRequired");
let coffeeNo = document.getElementById("coffeeNo");

// Coffee Selection variables
let coffeeSelection = document.getElementById("coffeeSelection");
let coffeeDisplay = document.getElementById("coffeeDisplay");
const COFFEES = [
  "Cappuccino", 
  "Flat White", 
  "Hot Mocha", 
  "Café Latte", 
  "Macchiato", 
  "White Choc Mocha", 
  "Chai Latte", 
  "Vanilla Latte", 
  "Long Black", 
  "Caramel Latte", 
  "Short Black", 
  "Piccolo Latte"
];
const regular = 5.50;
const medium = regular+1;
const large = regular+2;

// Order Display variables 
let orderDisplay = document.getElementById("orderDisplay");

// Other variables
let coffeeNumber = 0;
let totalCost = 0;
let coffeeDropdown = "";

for (let i = 0; i < COFFEES.length; i++) {
  coffeeDropdown += `<option value = "${i}">${COFFEES[i]}</option>`;
}

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

function checkNumberEntries(userInput, minValue, maxValue) {
  let errorMessage = "";
  // If input is not a number or negative then display error message and function returns false
  if (isNaN(userInput) || userInput < minValue || userInput > maxValue) {
    errorMessage = `Please enter a number of coffees between ${minValue} and ${maxValue}`;
    error.innerHTML = errorMessage;
    return false;
  } else return userInput;
}

function coffeeRow(i) {
  let row = `<tr id="row${i}">
    <td>
      <select id="coffee${i}">
        <option value="none">None</option>
        ${coffeeDropdown}
      </select>
    </td>
    <td>
      <select id="size${i}">
        <option value="regular">Regular</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
    </td>
  </tr>`;
  return row;
}

// Runs when the pickup button is clicked
pickup.addEventListener("submit", function (e) {
  e.preventDefault(); // prevents data from being sent elsewhere
  error.innerHTML = ""; //resets error message
  // Function is run to check for empty input, if so then an error message is outputted and the user has to resubmit their answer
  let nameEntered = pickupName.value;
  nameEntered = checkEmptyTextEntries(nameEntered, "Please enter the name");
  if (!nameEntered) {
    return;
  }
  changeSection(pickup, coffeesRequired);
})

// Runs when the delivery button is clicked
delivery.addEventListener("submit", function (e) {
  e.preventDefault();
  error.innerHTML = "";
  // Validating to make sure name input is not empty
  let nameEntered = deliveryName.value;
  nameEntered = checkEmptyTextEntries(nameEntered, "Please enter the name");
  if (!nameEntered) {
    return;
  }
  // Validating to make sure address input is not empty
  let addressEntered = address.value;
  addressEntered = checkEmptyTextEntries(addressEntered, "Please enter the address");
  if (!addressEntered) {
    return;
  }
  // Validating to make sure phone number input is not empty
  let phoneEntered = phone.value;
  phoneEntered = checkEmptyTextEntries(phoneEntered, "Please enter the phone number");
  if (!phoneEntered) {
    return;
  }
  totalCost += 5;
  changeSection(delivery, coffeesRequired);
})

coffeesRequired.addEventListener("submit", function (e) {
  e.preventDefault();
  error.innerHTML = ""; //resets error message
  // Checking for empty input, error displayed if empty
  coffeeNumber = coffeeNo.value;
  coffeeNumber = checkEmptyTextEntries(coffeeNumber, "Please enter the number of coffees ordered");
  if (!coffeeNumber) {
    return;
  }
  // Checking for invalid number input, error displayed if invalid
  coffeeNumber = checkNumberEntries(coffeeNumber, 1, 10);
  if (!coffeeNumber) {
    return;
  }

  introText.innerHTML = `Prices:<br>
    Regular - $${regular.toFixed(2)}<br>
    Medium - $${medium.toFixed(2)}<br>
    Large - $${large.toFixed(2)}`;

  for (let i = 1; i <= coffeeNumber; i++) {
    let row = coffeeRow(i);
    coffeeDisplay.innerHTML += row;
  }

  changeSection(coffeesRequired, coffeeSelection);
})

coffeeSelection.addEventListener("click", function (e) {
  e.preventDefault();

  for (let i = 1; i <= coffeeNumber; i++) {
    let coffeeSelection = document.getElementById(`coffee${i}`);
    error.innerHTML = "";

    if (coffeeSelection.value == "none") {
      error.innerHTML = "Please finish selecting all the coffees";
      return;
    }
  }

  changeSection(coffeeSelection, orderDisplay);
})

