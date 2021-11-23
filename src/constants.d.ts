export enum ACTIONS {
    ADD_DIGIT = "add-digit",
    CHOOSE_OPERATION = "choose-operation",
    CLEAR = "clear",
    DELETE_DIGIT = "delete-digit",
    EVALUATE = "evaluate",
}
export const INTEGER_FORMATTER = Intl.NumberFormat("en-us", { maximumFractionDigits: 0 });
