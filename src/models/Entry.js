export class Entry {
    constructor(customer_name, start_time, end_time) {
        this.customer_name = customer_name;
        this.start_time = start_time;
        this.end_time = end_time;
    }

    toRecord() {
        return {
            customer_name: this.customer_name,
            start_time: this.start_time,
            end_time: this.end_time,
        };
    }
}
