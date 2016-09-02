export interface AddAvailability {
    label: string;
    field: string;
    value?: any;
    values?: AddAvailabilityValues[];
}

export interface AddAvailabilityValues {
    label: string;
    key: string;
}
