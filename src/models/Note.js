class Note {
    constructor(time, text, id) {
        id ? this.id = id : this.id = null;
        time ? this.time = time : this.time = 0;
        text ? this.text = text : this.text = '';
    }

    fromObject(object) {
        if (object.id) this.id = object.id;
        if (object.time) this.time = object.time;
        if (object.text) this.text = object.text;
    }

    fromFirebaseDoc(object) {
        this.id = object.id;
        this.time = object.data().time;
        this.text = object.data().text;
    }

    toObject() {
        return ({
            time: this.time,
            text: this.text
        });
    }
}

export default Note;