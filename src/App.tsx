import "./styles.scss";
import { useReducer } from "react";
import { ACTIONS, INTEGER_FORMATTER } from "./constants.d";
import Button from "./Components/Buttons";
import OperationButton from "./Components/OperationButton";

function formatOperand(operand: string) {
    if (operand == null) return;
    const [integer, decimal] = operand.split(".");
    if (decimal == null) return INTEGER_FORMATTER.format(parseFloat(integer));
    return `${INTEGER_FORMATTER.format(parseFloat(integer))}.${decimal}`;
}

function evaluate({
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

function reducer(
    state: any,
    { type, payload }: { type: ACTIONS; payload: Record<string, string> }
) {
    switch (type) {
        case ACTIONS.ADD_DIGIT: {
            // overwrite the previous result
            if (state.overwrite)
                return { ...state, currentOperand: payload.digit, overwrite: false };
            // there can only be 1 zero at the start
            if (payload.digit === "0" && state.currentOperand === "0") return state;
            // the user can have only 1 period
            if (payload.digit === "." && state.currentOperand.includes(".")) return state;

            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.digit}`,
            };
        }
        case ACTIONS.CHOOSE_OPERATION: {
            if (state.currentOperand == null && state.previousOperand == null) {
                return state;
            }

            if (state.currentOperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                };
            }

            if (state.previousOperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null,
                };
            }

            return {
                ...state,
                previousOperand: evaluate(state),
                operation: payload.operation,
                currentOperand: null,
            };
        }
        case ACTIONS.EVALUATE: {
            if (
                state.operation == null ||
                state.currentOperand == null ||
                state.previousOperand == null
            )
                return state;
            return {
                ...state,
                currentOperand: evaluate(state),
                overwrite: true,
                previousOperand: null,
                operation: null,
            };
        }
        case ACTIONS.CLEAR: {
            return {};
        }
        case ACTIONS.DELETE_DIGIT: {
            if (state.overwrite)
                return { ...state, overwrite: false, currentOperand: null };

            // dont do anything if there are no digits
            if (state.currentOperand == null) return state;

            // remove everything if there is only 1 digit left
            if (state.currentOperand.length === 1)
                return { ...state, currentOperand: null };

            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1),
            };
        }
    }
}

function App() {
    // @ts-ignore
    const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
        reducer,
        {}
    );
    return (
        <div className="calculator-grid">
            <div className="output">
                <div className="previous-operand">
                    {formatOperand(previousOperand)} {operation}
                </div>
                <div className="current-operand">{formatOperand(currentOperand)}</div>
            </div>
            <button className="span-two">AC</button>
            <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT, payload: {} })}>
                DEL
            </button>
            <OperationButton operation="÷" dispatch={dispatch} />
            <Button digit="1" dispatch={dispatch} />
            <Button digit="2" dispatch={dispatch} />
            <Button digit="3" dispatch={dispatch} />
            <OperationButton operation="*" dispatch={dispatch} />

            <Button digit="4" dispatch={dispatch} />
            <Button digit="5" dispatch={dispatch} />
            <Button digit="6" dispatch={dispatch} />
            <OperationButton operation="+" dispatch={dispatch} />

            <Button digit="7" dispatch={dispatch} />
            <Button digit="8" dispatch={dispatch} />
            <Button digit="9" dispatch={dispatch} />
            <OperationButton operation="-" dispatch={dispatch} />

            <Button digit="." dispatch={dispatch} />
            <Button digit="0" dispatch={dispatch} />
            <button
                className="span-two"
                onClick={() => dispatch({ type: ACTIONS.EVALUATE, payload: {} })}
            >
                =
            </button>
        </div>
    );
}

export default App;
