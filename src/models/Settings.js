class Settings {
    constructor(childName, childBirthday) {
        this.uid = null;
        this.childName = childName ? childName : '';
        this.childBirthday = childBirthday ? childBirthday : null;
    }

    fromFirebaseDoc(object) {
        this.uid = object.data().uid || null;
        this.childName = object.data().childName || '';
        this.childBirthday = object.data().childBirthday || 0;
    }

    get asObject() {
        return ({
            uid: this.delegateId ? this.delegateId : this.uid,
            childName: this.childName,
            childBirthday: this.childBirthday
        });
    }
}

export default Settings;