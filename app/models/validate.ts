export interface ValidateField {
    isValid: boolean,
    messageText: string,
    isRequired: boolean,
    isTime?: boolean,
    etime_lower?: boolean,
    etime_greater?: boolean,
    isNumber?: boolean,
    number_lower?: boolean,
    number_greater?: boolean
}

