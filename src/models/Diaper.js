class Diaper {
    constructor(time, pee, poo, id) {
        id ? this.id = id : this.id = null;
        time ? this.time = time : this.time = 0;
        this.pee = pee || false;
        this.poo = poo || false;
    }

    fromObject(object) {
        if (object.id) this.id = object.id;
        if (object.time) this.time = object.time;
        if (object.pee) this.pee = object.pee;
        if (object.poo) this.poo = object.poo;
    }

    fromFirebaseDoc(object) {
        this.id = object.id;
        this.time = object.data().time;
        object.data().pee ? this.pee = object.data().pee : this.pee = false;
        object.data().poo ? this.poo = object.data().poo : this.poo = false;
    }

    toObject() {
        return ({
            time: this.time,
            pee: this.pee,
            poo: this.poo
        });
    }
}

export default Diaper;