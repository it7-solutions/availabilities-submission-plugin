export interface Availability {
    id: number;
    date: string;
    time: string;
    status: string;
    description: string;
    isDeletable: boolean;

    _expanded?: boolean;
}
