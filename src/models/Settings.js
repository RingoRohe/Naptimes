class Settings {
    constructor() {
        this.childName = "";
    }

    fromFirebaseDoc(object) {
        this.childName = object.data().childName;
    }

    get asObject() {
        return ({
            childName: this.childName
        });
    }
}

export default Settings;