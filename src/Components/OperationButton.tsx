import { ACTIONS } from "../constants.d";

export default function OperationButton({
    operation,
    dispatch,
}: {
    operation: string;
    dispatch: Function;
}) {
    return (
        <button
            onClick={() =>
                dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
            }
        >
            {operation}
        </button>
    );
}
