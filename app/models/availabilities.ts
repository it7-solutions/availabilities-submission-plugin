export interface Availability {
    id: number;
    date: string;
    start_time: string;
    end_time: string;
    status: string;
    session_name: string;
    isDeletable: boolean;
    description: string;

    _expanded?: boolean;
}
