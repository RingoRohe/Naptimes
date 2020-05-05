class Awake {
    constructor(start, end, id, timer) {
        id ? this.id = id : this.id = null;
        start ? this.start = start : this.start = 0;
        end ? this.end = end : this.end = 0;
        this.timer = timer || false;
    }

    fromObject(object) {
        if (object.id) this.id = object.id;
        if (object.start) this.start = object.start;
        if (object.end) this.end = object.end;
        if (object.timer) this.timer = object.timer;
    }

    toObject() {
        return ({
            start: this.start,
            end: this.end,
            timer: this.timer
        });
    }
}

export default Awake;