export interface Event {
    id: string;
    subject: string;
    start: {
        dateTime: string;
    };
    end: {
        dateTime: string;
    };
    location: {
        uniqueId: string;
    };
}
