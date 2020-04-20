class Settings {
    constructor() {
        this.childName = "";
    }

    fromFirebaseDoc(object) {
        this.childName = object.data().childName;
        this.childBirthday = object.data().childBirthday;
    }

    get asObject() {
        return ({
            childName: this.childName,
            childBirthday: this.childBirthday
        });
    }
}

export default Settings;