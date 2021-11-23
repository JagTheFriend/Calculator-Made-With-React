import { INTEGER_FORMATTER } from "./constants.d";

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
