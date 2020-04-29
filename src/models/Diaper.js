class Diaper {
    constructor(time, pee, id) {
        id ? this.id = id : this.id = null;
        time ? this.time = time : this.time = 0;
        this.pee = pee || false;
    }

    fromObject(object) {
        if (object.id) this.id = object.id;
        if (object.time) this.time = object.time;
        if (object.pee) this.pee = object.pee;
    }

    fromFirebaseDoc(object) {
        this.id = object.id;
        this.time = object.data().time;
        object.data().pee ? this.pee = object.data().pee : this.pee = false;
    }

    toObject() {
        return ({
            time: this.time,
            pee: this.pee
        });
    }
}

export default Diaper;