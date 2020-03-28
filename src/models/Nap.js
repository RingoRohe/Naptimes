class Nap {
    constructor(start, end, id) {
        id ? this.id = id : this.id = null;
        start ? this.start = start : this.start = 0;
        end ? this.end = end : this.end = 0;
    }

    fromObject(object) {
        if (object.id) this.id = object.id;
        if (object.start) this.start = object.start;
        if (object.end) this.end = object.end;
    }

    fromFirebaseDoc(object) {
        this.id = object.id;
        this.start = object.data().start;
        this.end = object.data().end;
    }

    toObject() {
        return ({
            start: this.start,
            end: this.end
        });
    }
}

export default Nap;