export interface Availability {
    id: number;
    date: string;
    start_time: string;
    end_time: string;
    status: string;
    session_name: string;
    isDeletable: boolean;

    _expanded?: boolean;
}
