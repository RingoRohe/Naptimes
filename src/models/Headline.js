class Headline {
    constructor(id, text) {
        id ? (this.id = id) : (this.id = 0);
        text ? (this.text = text) : (this.text = 0);
    }

    fromObject(object) {
        if (object.id) this.id = object.id;
        if (object.text) this.text = object.text;
    }

    toObject() {
        return {
            id: this.id,
            text: this.text
        };
    }
}

export default Headline;
