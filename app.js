const display = document.querySelector('.calculator-display');
const numBtn = document.querySelectorAll('.number');
const currentOperand = document.querySelector('.current-operand');
const previousOperand = document.querySelector('.previous-operand');
const clearBtn = document.querySelector('.clear');
const delBtn = document.querySelector('.delete');
const operator = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals-key');
const decimal = document.querySelector('.decimal');

let displayValue = '';
let clickedOperator = '';
let num1 = '';
let num2 = '';

const clear = function clear() {
	currentOperand.textContent = '';
	previousOperand.textContent = '';
	displayValue = '';
	clickedOperator = '';
	num1 = '';
	num2 = '';
};

clearBtn.addEventListener('click', clear);

delBtn.addEventListener('click', function() {
	currentOperand.textContent = currentOperand.textContent.slice(0, currentOperand.textContent.length - 1);
});

decimal.addEventListener('click', function() {
	if (currentOperand.textContent.includes('.')) {
		currentOperand.textContent += 0;
	} else {
		currentOperand.textContent += '.';
	}
});

numBtn.forEach((button) => {
	button.addEventListener('click', function() {
		// need to figure out how to clear currentOperand when new number is clicked after a result is shown.

		if (num1 && clickedOperator) {
			currentOperand.textContent += button.textContent;
			num2 = parseFloat(currentOperand.textContent);
		} else {
			currentOperand.textContent += button.textContent;
		}
	});
});

operator.forEach((operator) => {
	operator.addEventListener('click', function(e) {
		if (clickedOperator && num2) {
			displayValue = operate(num1, clickedOperator, num2);
			previousOperand.textContent = num2;
			currentOperand.textContent = displayValue;
			clickedOperator = e.target.textContent;
			operator.classList.add('chosen-operator');
			num1 = displayValue;
			previousOperand.textContent = displayValue;
			currentOperand.textContent = '';
		} else {
			clickedOperator = e.target.textContent;
			operator.classList.add('chosen-operator');
			displayValue = parseFloat(currentOperand.textContent);
			previousOperand.textContent = displayValue;
			num1 = displayValue;
			currentOperand.textContent = '';
		}
	});
});

equals.addEventListener('click', function() {
	num2 = parseFloat(currentOperand.textContent);
	displayValue = operate(num1, clickedOperator, num2);

	previousOperand.textContent = `${clickedOperator}${num2}`;
	currentOperand.textContent = displayValue.toFixed(1);
});

const remove = function() {
	operator.forEach((operator) => {
		operator.classList.remove('chosen-operator');
	});
};

const add = function(num1, num2) {
	return num1 + num2;
};

const subtract = function(num1, num2) {
	return num1 - num2;
};

const multiply = function(num1, num2) {
	return num1 * num2;
};

const divide = function(num1, num2) {
	if (num2 != 0) {
		return num1 / num2;
	} else {
		alert('no dividing by zero! lololol');
	}
};

const operate = function(num1, operator, num2) {
	remove();
	switch (operator) {
		case '+':
			return add(num1, num2);
			break;
		case '-':
			return subtract(num1, num2);
			break;
		case '*':
			return multiply(num1, num2);
			break;
		case '/':
			return divide(num1, num2);
			break;
	}
};
