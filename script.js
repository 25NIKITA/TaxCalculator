//Prevents the default form submission behavior,meaning code calculates tax when the form is submitted, instead of refreshing the page.
document.getElementById("taxForm").addEventListener("submit", function (event) {
  event.preventDefault();
  calculateTax();
});

//this function computes the tax amount based on the user's input values.
function calculateTax() {
  event.preventDefault();

  // Get values from input fields
  var grossIncome = parseFloat(document.getElementById("grossIncome").value);
  var extraIncomeInput = document.getElementById("extraIncome").value.trim();
  var deductionsInput = document.getElementById("deductions").value.trim();
  var ageGroup = document.getElementById("ageGroup").value;

  // Check if all inputs are provided and are valid,if not give an alert so that the user fills up the correct information.
  if (
    isNaN(grossIncome) ||
    grossIncome <= 0 ||
    extraIncomeInput === "" ||
    isNaN(parseFloat(extraIncomeInput)) ||
    deductionsInput === "" ||
    isNaN(parseFloat(deductionsInput)) ||
    !ageGroup
  ) {
    alert("Please fill out all inputs with valid values.");
    return; // Exit the function early if any input is missing or invalid
  }

  // Converts the text entered into the extra income field into a number for further calculations.
  var extraIncome = parseFloat(extraIncomeInput);
  var deductions = parseFloat(deductionsInput);

  // Calculates overall income
  ////The Actual formula///
  var overallIncome = grossIncome + extraIncome - deductions;
  var taxAmount = 0;

  // Checks if  the income is over 8 Lakhs or not.As the conditon says that only if income>8 lakhs income is taxed or not.

  if (overallIncome > 800000) {
    // Calculate tax based on  the age group
    if (ageGroup === "18-39") {
      taxAmount = 0.3 * (overallIncome - 800000);
    } else if (ageGroup === "40-59") {
      taxAmount = 0.4 * (overallIncome - 800000);
    } else if (ageGroup === "60+") {
      taxAmount = 0.1 * (overallIncome - 800000);
    }
    alert("Tax calculated successfully!");
  } else {
    alert("No tax for income under 8 Lakhs.");
    return; // Exit the function early if income is under 8 Lakhs
  }

  // Displays the final outcome or result on a pop-up like screen.
  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];
  var overallIncomeText = document.getElementById("overallIncome");
  overallIncomeText.textContent =
    "Your overall income will be:- " +
    overallIncome.toFixed(2) +
    " after tax deductions";
  modal.style.display = "block";

  // Closes the output screen when clicked on 'x' or outside modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
