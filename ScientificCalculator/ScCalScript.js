const result = document.getElementById("result");

// Initialize memory variable
let memory = 0;

// Function to append value when a button is clicked
function appendValue(value) {
  result.value += value;
}

// Function to append a function (e.g., sqrt, sin) when a button is clicked
function appendFunction(func) {
  result.value += func + "(";
}

// Clear the result display
function clearResult() {
  result.value = "";
}

// Delete last character
function deleteLast() {
  result.value = result.value.slice(0, -1);
}

// Calculate the result of the expression
function calculate() {
  try {
    let expression = result.value;
    let answer = eval(expression);  // Evaluate the expression
    result.value = answer;
  } catch (error) {
    result.value = "Error";
  }
}

// Extra functions for advanced buttons
function power() {
  appendValue('**');
}

function factorial() {
  try {
    let num = parseFloat(result.value);
    if (isNaN(num) || num < 0) {
      result.value = "Error";
      return;
    }
    let fact = 1;
    for (let i = 1; i <= num; i++) {
      fact *= i;
    }
    result.value = fact;
  } catch {
    result.value = "Error";
  }
}

function toRadians() {
  try {
    result.value = (parseFloat(result.value) * Math.PI / 180).toFixed(6);
  } catch {
    result.value = "Error";
  }
}

function percent() {
  try {
    result.value = (parseFloat(result.value) / 100).toFixed(6);
  } catch {
    result.value = "Error";
  }
}

// Memory Functions

// Add current result to memory (M+)
function memoryAdd() {
  memory += parseFloat(result.value) || 0;
}

// Subtract current result from memory (M−)
function memorySubtract() {
  memory -= parseFloat(result.value) || 0;
}

// Recall memory value (MR)
function memoryRecall() {
  result.value = memory;
}

// Clear memory (MC)
function memoryClear() {
  memory = 0;
  result.value = "0";
}

// ✨ Keyboard input event listener
document.addEventListener("keydown", function(event) {
  const key = event.key;

  // Valid calculator keys
  const allowedKeys = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 
    '+', '-', '*', '/', 'Backspace', '(', ')', 'Escape', '%', 
    's', 'c', 't', 'f', 'm', 'M', 'r'
  ];

  // Handle valid keys
  if (allowedKeys.includes(key)) {
    if (key === 'Backspace') {
      deleteLast(); // Remove the last character
    } else if (key === 'Escape') {
      clearResult(); // Clear the input
    } else if (key === 's') {
      appendFunction('sin'); // Handle sin() function
    } else if (key === 'c') {
      appendFunction('cos'); // Handle cos() function
    } else if (key === 't') {
      appendFunction('tan'); // Handle tan() function
    } else if (key === 'f') {
      factorial(); // Handle factorial
    } else if (key === 'm') {
      memoryAdd(); // Handle M+ (memory add)
    } else if (key === 'M') {
      memorySubtract(); // Handle M− (memory subtract)
    } else if (key === 'r') {
      memoryRecall(); // Handle MR (memory recall)
    } else if (key === 'C') {
      memoryClear(); // Handle MC (memory clear)
    } else {
      appendValue(key); // Append the typed key to the display
    }
  }

  // Only calculate when the Equal button is pressed (not Enter)
  if (key === "=" || key === "Enter") {
    calculate(); // Trigger calculation
  }
});
