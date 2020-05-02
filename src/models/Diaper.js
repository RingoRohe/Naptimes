class Diaper {
    constructor(time, pee, poo, notes, id) {
        id ? this.id = id : this.id = null;
        time ? this.time = time : this.time = 0;
        this.pee = pee || false;
        this.poo = poo || false;
        this.notes = notes || null;
    }

    fromObject(object) {
        if (object.id) this.id = object.id;
        if (object.time) this.time = object.time;
        if (object.pee) this.pee = object.pee;
        if (object.poo) this.poo = object.poo;
        if (object.notes) this.notes = object.notes;
    }

    fromFirebaseDoc(object) {
        this.id = object.id;
        this.time = object.data().time;
        object.data().pee ? this.pee = object.data().pee : this.pee = false;
        object.data().poo ? this.poo = object.data().poo : this.poo = false;
        object.data().notes ? this.notes = object.data().notes : this.notes = null;
    }

    toObject() {
        return ({
            time: this.time,
            pee: this.pee,
            poo: this.poo,
            notes: this.notes
        });
    }
}

export default Diaper;