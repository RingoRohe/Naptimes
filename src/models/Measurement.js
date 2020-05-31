class Measurement {
    constructor(
        time = null,
        weight = null,
        bodySize = null,
        headCircumference = null,
        temperature = null,
        id = null
    ) {
        this.id = id;
        this.time = time;
        this.weight = weight;
        this.bodySize = bodySize;
        this.headCircumference = headCircumference;
        this.temperature = temperature;
    }

    fromObject(object) {
        let { id = null, time = null, weight = null, bodySize = null, headCircumference = null, temperature = null } = object;
        this.id = id;
        this.time = time;
        this.weight = weight;
        this.bodySize = bodySize;
        this.headCircumference = headCircumference;
        this.temperature = temperature;
    }

    fromFirebaseDoc(doc) {
        this.id = doc.id;
        this.time = doc.data().time;
        this.weight = doc.data().weight ? doc.data().weight : null;
        this.bodySize = doc.data().bodySize ? doc.data().bodySize : null;
        this.headCircumference = doc.data().headCircumference ? doc.data().headCircumference : null;
        this.temperature = doc.data().temperature ? doc.data().temperature : null;
    }

    hasWeight() {
        return this.weight !== null;
    }

    hasBodySize() {
        return this.bodySize !== null;
    }
    
    hasHeadCircumference() {
        return this.headCircumference !== null;
    }

    hasTemperature() {
        return this.temperature !== null;
    }

    toObject(withId = false) {
        let retObj = {};
        retObj.time = this.time;
        if (this.weight) retObj.weight = this.weight;
        if (this.bodySize) retObj.bodySize = this.bodySize;
        if (this.headCircumference) retObj.headCircumference = this.headCircumference;
        if (this.temperature) retObj.temperature = this.temperature;
        if (withId) retObj.id = this.id;
        return retObj;
    }
}

export default Measurement;