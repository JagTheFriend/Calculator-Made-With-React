import { ACTIONS } from "../constants.d";

export default function Buttons({
    dispatch,
    digit,
}: {
    dispatch: Function;
    digit: string;
}) {
    return (
        <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}>
            {digit}
        </button>
    );
}
