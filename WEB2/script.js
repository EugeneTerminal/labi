document.addEventListener('DOMContentLoaded', function() {
    // Инициализация переменных
    let currentInput = '0';
    let previousInput = '';
    let operator = null;
    let isPercent = false; // Флаг для обработки процентов
    let isError = false;  // Флаг для обработки ошибок
    let result = document.getElementById('result');

    // Переключение темы
    const toggleThemeButton = document.getElementById('theme-toggle');
    if (toggleThemeButton) {
        toggleThemeButton.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
        });
    } else {
        console.error('Toggle theme button not found!');
    }

    // Функция обновления результата на экране
    function updateResult() {
        result.textContent = currentInput;
    }

    // Функция для отображения ошибки
    function showError(message) {
        currentInput = message;
        isError = true;
        updateResult();
    }

    // Функция для обработки нажатия на цифры
    function handleDigit(digit) {
        if (isError) { 
            clearCalculator(); // Сброс состояния, если была ошибка
        }
        if (currentInput === '0' || isPercent) {
            currentInput = digit;
            isPercent = false;  // Сброс флага после ввода новой цифры
        } else {
            currentInput += digit;
        }
        updateResult();
    }

    // Функция для обработки оператора
    function handleOperator(op) {
        if (isError) return; // Игнорируем действия, если была ошибка
        if (operator !== null) {
            calculate();
        }
        previousInput = currentInput;
        currentInput = '0';
        operator = op;
        updateResult();
    }

    // Функция для выполнения вычислений
    function calculate() {
        if (isError) return; // Игнорируем действия, если была ошибка

        let resultValue = 0;
        let prev = parseFloat(previousInput);
        let current = parseFloat(currentInput);

        if (isPercent) {
            current = prev * (current / 100); // Применение процентов к предыдущему числу
            isPercent = false;
        }

        switch (operator) {
            case '+':
                resultValue = prev + current;
                break;
            case '-':
                resultValue = prev - current;
                break;
            case 'x':
                resultValue = prev * current;
                break;
            case '/':
                if (current === 0) {
                    showError('Error: Division by 0');
                    return;
                }
                resultValue = prev / current;
                break;
            default:
                return;
        }

        currentInput = resultValue.toString();
        operator = null;
        previousInput = '';
        updateResult();
    }

    // Функция для сброса калькулятора
    function clearCalculator() {
        currentInput = '0';
        previousInput = '';
        operator = null;
        isPercent = false;
        isError = false;
        updateResult();
    }

    // Функция для смены знака числа
    function toggleSign() {
        if (isError) return; // Игнорируем действия, если была ошибка
        if (currentInput === '0') return;
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateResult();
    }

    // Функция для процента
    function calculatePercentage() {
        if (isError) return; // Игнорируем действия, если была ошибка
        isPercent = true;  // Устанавливаем флаг для работы с процентами
        currentInput += '%';  // Отображаем % на экране
        updateResult();
    }

    // Функция для вычисления квадратного корня
    function calculateSqrt() {
        if (isError) return; // Игнорируем действия, если была ошибка
        let value = parseFloat(currentInput);
        if (value < 0) {
            showError('Error: Negative sqrt');
            return;
        }
        currentInput = Math.sqrt(value).toString();
        updateResult();
    }

    // Функция для вычисления квадрата числа
    function calculateSquare() {
        if (isError) return; // Игнорируем действия, если была ошибка
        currentInput = (parseFloat(currentInput) ** 2).toString();
        updateResult();
    }

    // Функция для вычисления факториала
    function calculateFactorial() {
        if (isError) return; // Игнорируем действия, если была ошибка
        let num = parseInt(currentInput);
        if (num < 0) {
            showError('Error: Negative factorial');
            return;
        }
        let factorial = 1;
        for (let i = 1; i <= num; i++) {
            factorial *= i;
        }
        currentInput = factorial.toString();
        updateResult();
    }

    // Функция для обработки точки
    function handleDot() {
        if (isError) {
            clearCalculator(); // Сброс состояния, если была ошибка
        }
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        updateResult();
    }

    // Обработчики событий для кнопок
    document.getElementById('btn_op_clear').addEventListener('click', clearCalculator);
    document.getElementById('btn_op_sign').addEventListener('click', toggleSign);
    document.getElementById('btn_op_percent').addEventListener('click', calculatePercentage);
    document.getElementById('btn_op_sqrt').addEventListener('click', calculateSqrt);
    document.getElementById('btn_op_square').addEventListener('click', calculateSquare);
    document.getElementById('btn_op_factorial').addEventListener('click', calculateFactorial);

    document.getElementById('btn_op_backspace').addEventListener('click', () => {
        if (isError) return; // Игнорируем действия, если была ошибка
        currentInput = currentInput.slice(0, -1) || '0';
        updateResult();
    });

    document.getElementById('btn_op_div').addEventListener('click', () => handleOperator('/'));
    document.getElementById('btn_op_mult').addEventListener('click', () => handleOperator('x'));
    document.getElementById('btn_op_minus').addEventListener('click', () => handleOperator('-'));
    document.getElementById('btn_op_plus').addEventListener('click', () => handleOperator('+'));
    document.getElementById('btn_op_equal').addEventListener('click', calculate);

    document.getElementById('btn_digit_0').addEventListener('click', () => handleDigit('0'));
    document.getElementById('btn_digit_1').addEventListener('click', () => handleDigit('1'));
    document.getElementById('btn_digit_2').addEventListener('click', () => handleDigit('2'));
    document.getElementById('btn_digit_3').addEventListener('click', () => handleDigit('3'));
    document.getElementById('btn_digit_4').addEventListener('click', () => handleDigit('4'));
    document.getElementById('btn_digit_5').addEventListener('click', () => handleDigit('5'));
    document.getElementById('btn_digit_6').addEventListener('click', () => handleDigit('6'));
    document.getElementById('btn_digit_7').addEventListener('click', () => handleDigit('7'));
    document.getElementById('btn_digit_8').addEventListener('click', () => handleDigit('8'));
    document.getElementById('btn_digit_9').addEventListener('click', () => handleDigit('9'));

    document.getElementById('btn_digit_dot').addEventListener('click', handleDot);
});
