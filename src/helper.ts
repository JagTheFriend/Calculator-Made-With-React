import { ACTIONS, INTEGER_FORMATTER } from "./constants.d";

export function formatOperand(operand: string) {
    if (operand == null) return;
    const [integer, decimal] = operand.split(".");
    if (decimal == null) return INTEGER_FORMATTER.format(parseFloat(integer));
    return `${INTEGER_FORMATTER.format(parseFloat(integer))}.${decimal}`;
}

export function evaluate({
    currentOperand,
    previousOperand,
    operation,
}: {
    currentOperand: string;
    previousOperand: string;
    operation: string;
}): string {
    const prev: number = parseFloat(previousOperand);
    const current: number = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return "";
    let computation = 0;
    switch (operation) {
        case "+":
            computation = prev + current;
            break;
        case "-":
            computation = prev - current;
            break;
        case "*":
            computation = prev * current;
            break;
        case "÷":
            computation = prev / current;
            break;
    }
    return computation.toString();
}

export function handleKeyPressed(event: any, dispatch: Function) {
    const digit = event!.key;

    switch (digit) {
        case "+": {
            return dispatch({
                type: ACTIONS.CHOOSE_OPERATION,
                payload: { operation: digit },
            });
        }
        case "-": {
            return dispatch({
                type: ACTIONS.CHOOSE_OPERATION,
                payload: { operation: digit },
            });
        }
        case "*": {
            return dispatch({
                type: ACTIONS.CHOOSE_OPERATION,
                payload: { operation: digit },
            });
        }
        case "/": {
            return dispatch({
                type: ACTIONS.CHOOSE_OPERATION,
                payload: { operation: "÷" },
            });
        }
        case "Backspace": {
            return dispatch({ type: ACTIONS.DELETE_DIGIT, payload: { digit } });
        }
        case "Enter":
        case "=": {
            return dispatch({ type: ACTIONS.EVALUATE, payload: { digit } });
        }
        default: {
            // check whether the digit is a number or not before showing it to the screen
            if (isNaN(parseInt(digit)) && digit !== ".") return;
            return dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
        }
    }
}
