export interface ValidateField {
    isValid: boolean,
    messageText: string,
    isRequired: boolean,
    isTime?: boolean,
    etime_greater?: boolean
}

