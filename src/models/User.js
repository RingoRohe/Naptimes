class User {
    constructor(uid, displayName) {
        uid ? this.uid = uid : this.uid = 0;
        displayName ? this.displayName = displayName : this.displayName = 0;
    }

    fromObject(object) {
        object.uid ? this.uid = object.uid : this.uid = false;
        object.displayName ? this.displayName = object.displayName : this.displayName = "";
    }

    toObject() {
        return ({
            displayName: this.displayName
        });
    }
}

export default User;