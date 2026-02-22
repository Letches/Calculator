// Get the display element
const display = document.getElementById('display');

// Function to append value to display
function appendToDisplay(value) {
    if (display.value === 'Error') {
        display.value = '';
    }
    display.value += value;
}

// Function to clear display
function clearDisplay() {
    display.value = '';
}

// Function to delete last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Function to calculate result
function calculate() {
    try {
        // Check if display is empty
        if (display.value === '') {
            display.value = '0';
            return;
        }

        // Replace × with * for evaluation
        let expression = display.value.replace(/×/g, '*');
        
        // Evaluate the expression
        let result = eval(expression);
        
        // Check if result is valid
        if (isNaN(result) || !isFinite(result)) {
            display.value = 'Error';
        } else {
            // Round to 10 decimal places to avoid floating point issues
            result = Math.round(result * 10000000000) / 10000000000;
            display.value = result;
        }
    } catch (error) {
        display.value = 'Error';
    }
}

// Add keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Numbers and operators
    if (/[0-9\.\+\-\*\/]/.test(key)) {
        appendToDisplay(key);
    }
    
    // Enter key for calculation
    if (key === 'Enter') {
        calculate();
    }
    
    // Backspace key for delete
    if (key === 'Backspace') {
        deleteLast();
    }
    
    // Escape key for clear
    if (key === 'Escape') {
        clearDisplay();
    }
    
    // Prevent default behavior for certain keys
    if (['Enter', 'Backspace', 'Escape'].includes(key)) {
        event.preventDefault();
    }
});

// Prevent multiple decimal points in a number
function appendToDisplay(value) {
    if (display.value === 'Error') {
        display.value = '';
    }
    
    // Prevent multiple decimal points in the same number
    if (value === '.') {
        const lastNumber = display.value.split(/[\+\-\*\/]/).pop();
        if (lastNumber.includes('.')) {
            return;
        }
    }
    
    display.value += value;
}