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
// Used to differentiate between pickup or delivery later in the code
let pickupChoice = true;
const deliveryCost = 5;
// Customer details
let nameEntered = "";
let addressEntered = "";
let phoneEntered = "";

// Number of coffees required variables
let introText = document.getElementById("introText");
let coffeesRequired = document.getElementById("coffeesRequired");
let coffeeNo = document.getElementById("coffeeNo");
let coffeeNumber = 0;

// Coffee selection variables
let coffeeSelection = document.getElementById("coffeeSelection");
let coffeeDisplay = document.getElementById("coffeeDisplay");
// All the coffees
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
// Prices for different coffee sizes
const regular = 5.50;
const medium = regular+1;
const large = regular+2;

// Order Display variables 
let orderDisplay = document.getElementById("orderDisplay");
let userInfoOutput = document.getElementById("userInfoOutput");
let orderDisplayTable = document.getElementById("orderDisplayTable");

// Other variables 
let totalCost = 0;
let coffeeDropdown = "";

// Adding coffees to the coffeeDropdown variable in a format that can be displayed under the select tag on the table
for (let i = 0; i < COFFEES.length; i++) {
  coffeeDropdown += `<option value="${COFFEES[i]}">${COFFEES[i]}</option>`;
}

// Function hides previous section and shows new section
function changeSection(hide, show) {
  hide.classList.add("hide");
  show.classList.remove("hide");
  // Resetting error messages from the previous sections
  error.innerHTML = "";
}

// Validates empty entries
function checkEmptyTextEntries(userInput, errorText) {
  // Error message reset so that it does not remain when text the input is valid
  let errorMessage = "";

  // If input is empty then the error message is outputted and the function returns false, otherwise the program continues reutrning user input.
  if (userInput == "") {
    errorMessage = errorText;
    error.innerHTML = errorMessage;
    return false;
  } else return userInput;
}

// Validates invalid number entries
function checkNumberEntries(userInput, minValue, maxValue) {
  let errorMessage = "";

  // If input is not a number or does not fall between the specified values, then the error message is displayed and function returns false, otherwise the program continues reutrning user input.
  if (isNaN(userInput) || userInput < minValue || userInput > maxValue) {
    errorMessage = `Please enter a number of coffees between ${minValue} and ${maxValue}`;
    error.innerHTML = errorMessage;
    return false;
  } else return userInput;
}

// Creates and returns a row containing dropdown coffee names and sizes
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
  nameEntered = pickupName.value;
  nameEntered = checkEmptyTextEntries(nameEntered, "Please enter the name");
  if (!nameEntered) {
    return;
  }
  // Switches to number of coffees section
  changeSection(pickup, coffeesRequired);
})

// Runs when the delivery button is clicked
delivery.addEventListener("submit", function (e) {
  e.preventDefault();
  error.innerHTML = "";
  // Validating to make sure name input is not empty
  nameEntered = deliveryName.value;
  nameEntered = checkEmptyTextEntries(nameEntered, "Please enter the name");
  if (!nameEntered) {
    return;
  }
  // Validating to make sure address input is not empty
  addressEntered = address.value;
  addressEntered = checkEmptyTextEntries(addressEntered, "Please enter the address");
  if (!addressEntered) {
    return;
  }
  // Validating to make sure phone number input is not empty
  phoneEntered = phone.value;
  phoneEntered = checkEmptyTextEntries(phoneEntered, "Please enter the phone number");
  if (!phoneEntered) {
    return;
  }
  // Changed to false so the final order will be able to recognise that the customer requested delivery, hence the extra customer details of address and phone. 
  pickupChoice = false;
  // Switches to number of coffees section
  changeSection(delivery, coffeesRequired);
})

coffeesRequired.addEventListener("submit", function (e) {
  e.preventDefault();
  error.innerHTML = ""; //resets error message
  coffeeNumber = coffeeNo.value;
  // Checking for empty input, error displayed if empty
  coffeeNumber = checkEmptyTextEntries(coffeeNumber, "Please enter the number of coffees ordered");
  if (!coffeeNumber) {
    return;
  }
  // Checking for invalid number input, error displayed if invalid
  coffeeNumber = checkNumberEntries(coffeeNumber, 1, 10);
  if (!coffeeNumber) {
    return;
  }

  // Reminds the user the prices for each of the different coffee sizes in the selection section
  introText.innerHTML = `Prices:<br>
    Regular - $${regular.toFixed(2)}<br>
    Medium - $${medium.toFixed(2)}<br>
    Large - $${large.toFixed(2)}`;

  // Number of rows coresponding to the number of coffees requested by the customer are created for the selection section
  for (let i = 1; i <= coffeeNumber; i++) {
    let row = coffeeRow(i);
    coffeeDisplay.innerHTML += row;
  }

  // Switches to number of coffees selection section
  changeSection(coffeesRequired, coffeeSelection);
})

coffeeSelection.addEventListener("submit", function (e) {
  e.preventDefault();

  // Validates through each coffee to make sure none of the coffee rows are left blank, the user cannot proceed until all of the customer's coffees are picked
  for (let i = 1; i <= coffeeNumber; i++) {
    let coffeeSelection = document.getElementById(`coffee${i}`);
    error.innerHTML = "";

    // Default option which cannot be picked
    if (coffeeSelection.value == "none") {
      error.innerHTML = "Please finish selecting all the coffees";
      return;
    }
  }

  // Resetting variables so that no errors are caused in case of output display if the user decided to come back to edit their order again before submitting
  totalCost = 0;
  userInfoOutput.innerHTML = "";
  orderDisplayTable.innerHTML = `<br><br>
    <tr>
      <th>Coffee</th>
      <th>Size</th>
    </tr>`;

  // If the customer requested pickup, on the customer name is shown
  userInfoOutput.innerHTML += `Name: ${nameEntered}<br>`;

  // If the customer requested delivery, the customer's address and phone are also shown
  if (!pickupChoice) {
    userInfoOutput.innerHTML += `Address: ${addressEntered}<br>`;
    userInfoOutput.innerHTML += `Phone: ${phoneEntered}<br>`;
    // Delivery cost added to total cost
    totalCost += deliveryCost;
  }

  // Costs are tallied up for each coffee and size of coffee requested by the customer
  for (let i = 1; i <= coffeeNumber; i++) {
    let coffeeSelection = document.getElementById(`coffee${i}`);
    let sizeSelection = document.getElementById(`size${i}`);

    console.log(sizeSelection.value);
    if (sizeSelection.value == "regular") {
      totalCost += regular;
    } else if (sizeSelection.value == "medium") {
      totalCost += medium;
    } else {
      totalCost += large;
    }

    // New rows are created for each chosen coffee and its chosen size
    let row = `
      <tr> 
        <td>${coffeeSelection.value}</td>
        <td>${sizeSelection.value}</td>
      </tr>`;
    
    // Each row is added to the table to be displayed as it is looped through
    orderDisplayTable.innerHTML += row;
  }

  // Final row in the table which displays the total cost of the coffees purchased by the customers
  let displayCost = `
    <tr>
      <td>Total Cost:</td>
      <td>$${totalCost.toFixed(2)}</td>
    </tr>`;

  // The row is added to the table in html to tbe displayed
  orderDisplayTable.innerHTML += displayCost;

  // Switches to the order display section
  changeSection(coffeeSelection, orderDisplay);
})

