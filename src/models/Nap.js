class Nap {
    constructor(start, end) {
        start ? this.start = start : this.start = 0;
        end ? this.end = end : this.end = 0;
    }

    fromObject(object) {
        this.start = object.start;
        this.end = object.end;
    }

    toObject() {
        return ({
            start: this.start,
            end: this.end
        });
    }
}

export default Nap;