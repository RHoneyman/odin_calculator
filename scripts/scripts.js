/// CALCULATOR ///
function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  if (y != 0) {
    return x / y;
  } else if (y == 0) {
    return "Cannot divide by 0!";
  }
}

function operate(operator, x, y) {
  switch(operator) {
    case '+': 
      return add(x, y);
    case '-':
      return subtract(x, y);
    case 'x':
      return multiply(x,y);
    case '÷':
      return divide(x, y);
    default:
      return 'ERROR';
  }
}

// DOM //
const clearBtn = document.querySelector('#clear');
const divideBtn = document.querySelector('#divide');
const multiplyBtn = document.querySelector('#multiply');
const subtractBtn = document.querySelector('#subtract');
const addBtn = document.querySelector('#add');
const equalsBtn = document.querySelector('#equals');
const periodBtn = document.querySelector('#period');
const posNegBtn = document.querySelector('#posNeg');
const displayNum1 = document.querySelector('#displayNum1');
const displayOperator = document.querySelector('#displayOperator');
const displayNum2 = document.querySelector('#displayNum2');
const digits = document.querySelectorAll('.digits');
const operators = document.querySelectorAll('.operators');

let num1Selected = false;
let num2Selected = false;
let operatorSelected = false;
let solutionFound = false;

let value1 = null, value2 = null, operator = null;

clearBtn.addEventListener('click', clear);
equalsBtn.addEventListener('click', findSolution);
periodBtn.addEventListener('click', addPeriod);
posNegBtn.addEventListener('click', negate);

digits.forEach( (digit) => {
  digit.addEventListener('click', addValue);
});

operators.forEach( (operator) => {
  operator.addEventListener('click', selectOperator);
});

function addPeriod() {
  if (solutionFound == true) clear();
  if (!num1Selected) {
    num1Selected = true;
    value1 = "0.";
  } else if (num1Selected && !operatorSelected) {
    if (value1.length < 9 && !value1.includes(".")) {
        value1 += ".";
      } 
  } else if (num1Selected && operatorSelected) {
    if(!num2Selected) {
      num2Selected = true;
      value2 = "0.";
    } else if (num2Selected) {
      if (value2.length < 9 && !value2.includes(".")) {
        value2 += ".";
      }
    }
  }

  displayNum1.textContent = value1;
  displayNum2.textContent = value2;
}

function addValue(e) {
  let curVal = String(e.target.value);
  if (solutionFound == true) clear();

  if (!num1Selected) {
    num1Selected = true;
    value1 = curVal;
  } else if (num1Selected && !operatorSelected) {
    if (value1 == 0 && !value1.includes('.')) {
      value1 = curVal;
    } else if (value1.length < 9) {
      value1 = value1 + curVal;
    }
  } else if (num1Selected && operatorSelected) {
    if(!num2Selected) {
      num2Selected = true;
      value2 = curVal;
    } else if (num2Selected) {
      if (value2 == 0 && !value2.includes('.')) {
        value2 = curVal;
      } else if (value2.length < 9) {
        value2 = value2 + curVal;
      }
    }
  }

  displayNum1.textContent = value1;
  displayNum2.textContent = value2;

}

function negate() {
  if (solutionFound) {
    value1 *= -1;
    displayNum1.textContent = value1;
    solutionFound = false;
    value2 = null;
    num2Selected = false;
    value1 = String(value1);
  } else if (num2Selected) {
    value2 *= -1;
    displayNum2.textContent = value2;
    value2 = String(value2);
  } else if (num1Selected) {
    value1 *= -1;
    displayNum1.textContent = value1;
    value1 = String(value1);
  }
}

function findSolution() {
  if (num1Selected && operatorSelected && num2Selected) {
    value1 = Number(value1);
    value2 = Number(value2);
    let solution = operate(operator, value1, value2);
    if(solution == "Cannot divide by 0!"){
      clear();
      displayNum1.textContent = "Cannot divide by 0!";
    } else {
      value1 = String(solution);
      value2 = String(value2);
      displayNum1.textContent = value1;
      displayNum2.textContent = "";
      displayOperator.textContent = "";
      solutionFound = true;
    }
  }
}


function selectOperator(e) {
  if (!num1Selected) {
  }
  else if (num1Selected && !num2Selected) {
    operator = e.target.textContent;
    displayOperator.textContent = operator;
    operatorSelected = true;
  } else if (num1Selected && num2Selected  && !solutionFound) {
    findSolution();
    operator = e.target.textContent;
    displayOperator.textContent = operator;
    operatorSelected = true;
    num2Selected = false;
    value2 = null;
    solutionFound = false;
  } else if (num1Selected && num2Selected && solutionFound) {
    operator = e.target.textContent;
    displayOperator.textContent = operator;
    operatorSelected = true;
    num2Selected = false;
    value2 = null;
    solutionFound = false;
  }
}

function clear() {
  num1Selected = false;
  num2Selected = false;
  operatorSelected = false;
  solutionFound = false;
  value1 = null;
  value2 = null;
  operator = null;
  displayNum1.textContent = '';
  displayOperator.textContent = '';
  displayNum2.textContent = '';
}


