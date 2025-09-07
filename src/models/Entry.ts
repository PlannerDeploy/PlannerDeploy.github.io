export interface EntryRecord {
    id?: number;
    customer_name: string;
    start_time: string;
    end_time: string;
}

export class Entry {
    private customer_name: string;
    private start_time: string;
    private end_time: string;

    constructor(
        customer_name: string,
        start_time: string,
        end_time: string
    ) {
        this.customer_name = customer_name;
        this.start_time = start_time;
        this.end_time = end_time;
    }

    toRecord(): EntryRecord {
        return {
            customer_name: this.customer_name,
            start_time: this.start_time,
            end_time: this.end_time,
        };
    }
}