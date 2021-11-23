export enum ACTIONS {
    ADD_DIGIT = "add-digit",
    CHOOSE_OPERATION = "choose-operation",
    CLEAR = "clear",
    DELETE_DIGIT = "delete-digit",
    EVALUATE = "evaluate",
}
export const INTEGER_FORMATTER = Intl.NumberFormat("en-us", { maximumFractionDigits: 0 });
export const KEYPAD = [
    "÷",
    "1",
    "2",
    "3",

    "+",
    "4",
    "5",
    "6",

    "*",
    "7",
    "8",
    "9",

    "-",
    ".",
    "0",
];
