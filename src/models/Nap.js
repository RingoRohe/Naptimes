class Nap {
    constructor(start, end, id, notes) {
        id ? this.id = id : this.id = null;
        start ? this.start = start : this.start = 0;
        end ? this.end = end : this.end = 0;
        notes ? this.notes = notes : this.notes = null;
    }

    fromObject(object) {
        if (object.id) this.id = object.id;
        if (object.start) this.start = object.start;
        if (object.end) this.end = object.end;
        if (object.notes) this.notes = object.notes;
    }

    fromFirebaseDoc(object) {
        this.id = object.id;
        this.start = object.data().start;
        this.end = object.data().end;
        object.data().notes ? this.notes = object.data().notes : this.notes = null;
    }

    toObject() {
        return ({
            start: this.start,
            end: this.end,
            notes: this.notes ? this.notes : null
        });
    }
}

export default Nap;