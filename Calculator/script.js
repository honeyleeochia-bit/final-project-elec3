let display = document.getElementById('display');
let currentInput = '0';
let operator = null;
let previousInput = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        if (currentInput === '0' && num !== '.') {
            currentInput = num;
        } else if (num === '.' && currentInput.includes('.')) {
            return;
        } else {
            currentInput += num;
        }
    }
    updateDisplay();
}

function appendOperator(op) {
    if (previousInput !== null && operator !== null && !shouldResetDisplay) {
        calculate();
    }
    previousInput = parseFloat(currentInput);
    operator = op;
    shouldResetDisplay = true;
}

function calculate() {
    if (operator === null || previousInput === null) return;

    const current = parseFloat(currentInput);
    let result;

    switch (operator) {
        case '+':
            result = previousInput + current;
            break;
        case '-':
            result = previousInput - current;
            break;
        case '*':
            result = previousInput * current;
            break;
        case '/':
            result = previousInput / current;
            break;
        case '%':
            result = previousInput % current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = null;
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    operator = null;
    previousInput = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteChar() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

/* ✅ KEYBOARD SUPPORT */
document.addEventListener("keydown", (event) => {
    const key = event.key;

    // Numbers
    if (!isNaN(key)) {
        appendNumber(key);
        highlightButton(key);
        return;
    }

    // Operators
    if (["+", "-", "*", "/", "%"].includes(key)) {
        appendOperator(key);
        highlightButton(key);
        return;
    }

    // Enter or =
    if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
        highlightButton("=");
        return;
    }

    // Backspace
    if (key === "Backspace") {
        deleteChar();
        highlightButton("DEL");
        return;
    }

    // Escape clears all
    if (key === "Escape") {
        clearDisplay();
        highlightButton("C");
        return;
    }

    // Decimal
    if (key === ".") {
        appendNumber(".");
        highlightButton(".");
        return;
    }
});

/* ✅ Highlight button when keyboard is used */
function highlightButton(value) {
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(btn => {
        const text = btn.textContent;

        // Match equals button
        if (value === "=" && text === "=") {
            btn.classList.add("active-key");
            setTimeout(() => btn.classList.remove("active-key"), 150);
        }

        // Match DEL/C
        if (value === "DEL" && text === "DEL") {
            btn.classList.add("active-key");
            setTimeout(() => btn.classList.remove("active-key"), 150);
        }

        if (value === "C" && text === "C") {
            btn.classList.add("active-key");
            setTimeout(() => btn.classList.remove("active-key"), 150);
        }

        // Match operators & numbers
        if (text === value || (text === "÷" && value === "/") || (text === "×" && value === "*")) {
            btn.classList.add("active-key");
            setTimeout(() => btn.classList.remove("active-key"), 150);
        }
    });
}
