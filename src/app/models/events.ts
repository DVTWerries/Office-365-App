export interface Event {
    id: string;
    subject: string;
    start: {
        dateTime: string;
    };
    endDate: {
        dateTime: string;
    };
    location: {
        uniqueId: string;
    };
}
