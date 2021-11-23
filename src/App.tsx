import "./styles.scss";
import { useReducer } from "react";
import { ACTIONS } from "./constants.d";
import Button from "./Components/Buttons";
import OperationButton from "./Components/OperationButton";

declare var currentOperand: string;

function reducer(
    state: any,
    { type, payload }: { type: ACTIONS; payload: Record<string, number> }
) {
    switch (type) {
        case ACTIONS.ADD_DIGIT:
            return {
                ...state,
                currentOperand: `${currentOperand || ""}${payload.digit}`,
            };
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
                    {previousOperand} {operation}
                </div>
                <div className="current-operand">{currentOperand}</div>
            </div>
            <button className="span-two">AC</button>
            <button>DEL</button>
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
            <button className="span-two">=</button>
        </div>
    );
}

export default App;
