/**
 * Clase que representa una calculadora con historial.
 */
class Calculator {
    /**
     * Crea una nueva instancia de la calculadora.
     */
    constructor() {
        /**
         * Historial de operaciones realizadas.
         * @type {Array<{num1: number, num2: number, operation: string, result: (number|string)}>}
         */
        this.history = [];
    }

    /**
     * Realiza la suma de dos números.
     * @param {number} num1 - El primer número.
     * @param {number} num2 - El segundo número.
     * @returns {number} El resultado de la suma.
     */
    add(num1, num2) {
        const result = num1 + num2;
        this.addToHistory(num1, num2, 'add', result);
        return result;
    }

    /**
     * Realiza la resta de dos números.
     * @param {number} num1 - El primer número.
     * @param {number} num2 - El segundo número.
     * @returns {number} El resultado de la resta.
     */
    subtract(num1, num2) {
        const result = num1 - num2;
        this.addToHistory(num1, num2, 'subtract', result);
        return result;
    }

    /**
     * Realiza la multiplicación de dos números.
     * @param {number} num1 - El primer número.
     * @param {number} num2 - El segundo número.
     * @returns {number} El resultado de la multiplicación.
     */
    multiply(num1, num2) {
        const result = num1 * num2;
        this.addToHistory(num1, num2, 'multiply', result);
        return result;
    }

    /**
     * Realiza la división de dos números.
     * @param {number} num1 - El primer número.
     * @param {number} num2 - El segundo número.
     * @returns {(number|string)} El resultado de la división o un mensaje de error si se intenta dividir por cero.
     */
    divide(num1, num2) {
        if (num2 === 0) {
            this.addToHistory(num1, num2, 'divide', 'Error: División por cero');
            return 'Error: División por cero';
        }
        const result = num1 / num2;
        this.addToHistory(num1, num2, 'divide', result);
        return result;
    }

    /**
     * Añade una operación al historial.
     * @param {number} num1 - El primer número.
     * @param {number} num2 - El segundo número.
     * @param {string} operation - El tipo de operación realizada (add, subtract, multiply, divide).
     * @param {(number|string)} result - El resultado de la operación.
     */
    addToHistory(num1, num2, operation, result) {
        this.history.push({ num1, num2, operation, result });
    }

    /**
     * Obtiene el historial de operaciones realizadas.
     * @returns {Array<{num1: number, num2: number, operation: string, result: (number|string)}>} El historial de operaciones.
     */
    getHistory() {
        return this.history;
    }
}

const calculator = new Calculator();

/**
 * Maneja el evento de envío del formulario de la calculadora.
 * @param {Event} event - El evento de envío del formulario.
 */
document.getElementById('calculatorForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;

    let result;
    switch (operation) {
        case 'add':
            result = calculator.add(num1, num2);
            break;
        case 'subtract':
            result = calculator.subtract(num1, num2);
            break;
        case 'multiply':
            result = calculator.multiply(num1, num2);
            break;
        case 'divide':
            result = calculator.divide(num1, num2);
            break;
        default:
            result = 'Operación no válida';
    }

    displayResult(result);
    updateHistory(calculator.getHistory());
});

/**
 * Muestra el resultado de la operación en la página.
 * @param {(number|string)} result - El resultado de la operación.
 */
function displayResult(result) {
    const resultElement = document.getElementById('result');
    if (typeof result === 'number') {
        resultElement.textContent = `El resultado es: ${result}`;
    } else {
        resultElement.textContent = result;
    }
}

/**
 * Actualiza el historial de operaciones en la página.
 * @param {Array<{num1: number, num2: number, operation: string, result: (number|string)}>} history - El historial de operaciones.
 */
function updateHistory(history) {
    const historyElement = document.getElementById('history');
    historyElement.innerHTML = '';
    history.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `Operación: ${entry.operation}, Números: ${entry.num1} y ${entry.num2}, Resultado: ${entry.result}`;
        historyElement.appendChild(li);
    });
}
