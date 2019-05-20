export interface Event {
    id: string;
    subject: string;
    start: {
        dateTime: string,
        timeZone: 'UTC'
    };
    end: {
        dateTime: string,
        timeZone: 'UTC'
    };
    location: {
        uniqueId: string;
    };
    attendees: [
        {
            type: 'optional',
            emailAddress: { address: 'AKock@jhb.dvt.co.za' }
        }
    ];
}
