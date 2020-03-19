function expressionCalculator(expr) {
    let arr = expr.split(' ').join('').replace(/[\(\)\*\/\+\-]/g, (match => ' ' + match + ' ')).trim().replace(/ {1,}/g," ").split(' ');

    let priority = {
        '*': 2,
        '/': 2,
        '+': 1,
        '-': 1,
        '(': 0,
        ')': 0
    }
    let operations = {
        add(a, b) {
            return a + b;
        },
        subtract(a, b) {
            return a - b;
        },
        multiply(a, b) {
            return a * b;
        },
        divide(a, b) {
            return a / b;
        }
    }
    let res;
    let p = 0;
    let numbers = [];
    let operators = [];

    let openBrackets = arr.filter(el => el === '(').length;
    let closeBrackets = arr.filter(el => el === ')').length;
    if (openBrackets !== closeBrackets) {
        throw new Error('ExpressionError: Brackets must be paired');
    }

    arr.forEach((el) => {
        if (Number(el) || Number(el) === 0) {
            numbers.push(Number(el));
        } else if (el === '*' || el === '/' || el === '+' || el === '-') {
            if (priority[el] > p) {
                operators.push(el)
                p = priority[el];
            } else {   
                if (operators[operators.length-1] === '+' || operators[operators.length-1] === '-') {
                    if (operators[operators.length-1] === '+') {
                        res = operations.add(numbers[numbers.length-2], numbers[numbers.length-1]);
                    } else if (operators[operators.length-1] === '-') {
                        res = operations.subtract(numbers[numbers.length-2], numbers[numbers.length-1]);
                    }
                    numbers.splice(-2, 2);
                    numbers.push(res);
                    operators.pop();
                } else if (operators[operators.length-1] === '*' || operators[operators.length-1] === '/') {
                    if (operators[operators.length-1] === '*') {
                        res = operations.multiply(numbers[numbers.length-2], numbers[numbers.length-1]);
                    } else if (operators[operators.length-1] === '/') {
                        if (numbers[numbers.length - 1] === 0) {
                            throw new Error('TypeError: Division by zero.');
                        } else {
                            res = operations.divide(numbers[numbers.length-2], numbers[numbers.length-1]);  
                        }
                    }
                    numbers.splice(-2, 2);
                    numbers.push(res);
                    operators.pop();
                    
                    if (priority[operators[operators.length-1]] === priority[el]) {

                        if (operators[operators.length-1] === '+') {
                            res = operations.add(numbers[numbers.length-2], numbers[numbers.length-1]);
                        } else if (operators[operators.length-1] === '-') {
                            res = operations.subtract(numbers[numbers.length-2], numbers[numbers.length-1]);
                        } 
                        numbers.splice(-2, 2);
                        numbers.push(res);
                        operators.pop();
                    }
                }
                operators.push(el);          
                p = priority[el];
            } 
        } else if (el === '(') {
            operators.push(el);
            p = priority[el];
        } else if (el === ')') {
            while (operators[operators.length-1] !== '(') {

                if (operators[operators.length-1] === '+') {
                    res = operations.add(numbers[numbers.length-2], numbers[numbers.length-1]);
                } else if (operators[operators.length-1] === '-') {
                    res = operations.subtract(numbers[numbers.length-2], numbers[numbers.length-1]);
                } else if (operators[operators.length-1] === '*') {
                    res = operations.multiply(numbers[numbers.length-2], numbers[numbers.length-1]);
                } else if (operators[operators.length-1] === '/') {
                    if (numbers[numbers.length - 1] === 0) {
                        throw new Error('TypeError: Division by zero.');
                    } else {
                        res = operations.divide(numbers[numbers.length-2], numbers[numbers.length-1]);
                    } 
                } 
                numbers.splice(-2, 2);
                numbers.push(res);
                operators.pop();
            }
            operators.pop();
            p = priority[operators[operators.length-1]] || 0;
        }
    });

    while (operators.length > 0) {  
        if (operators[operators.length-1] === '+') {
            res = operations.add(numbers[numbers.length-2], numbers[numbers.length-1]); 
        } else if (operators[operators.length-1] === '-') {
            res = operations.subtract(numbers[numbers.length-2], numbers[numbers.length-1]);
        } else if (operators[operators.length-1] === '*') {
            res = operations.multiply(numbers[numbers.length-2], numbers[numbers.length-1]);
        } else if (operators[operators.length-1] === '/') {
            if (numbers[numbers.length - 1] === 0) {
                throw new Error('TypeError: Division by zero.');
            } else {
                res = operations.divide(numbers[numbers.length-2], numbers[numbers.length-1]);
            }
        } 
        numbers.splice(-2, 2);
        numbers.push(res);
        operators.pop();
    }  
    return res;
}

module.exports = {
    expressionCalculator
}