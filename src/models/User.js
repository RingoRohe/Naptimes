class User {
    constructor(uid, email, photoURL, displayName) {
        this.uid = uid ? uid : "";
        this.email = email ? email : "";
        this.photoURL = photoURL ? photoURL : "";
        this.displayName = displayName ? displayName : "";
        this.delegateId = null;
    }

    fromFirebaseDoc(object) {
        this.uid = object.data().uid;
        this.email = object.data().email;
        this.photoURL = object.data().photoURL;
        this.displayName = object.data().displayName;
        this.delegateId = object.data().delegateId ? object.data().delegateId : null;
    }

    get asObject() {
        return ({
            uid: this.delegateId ? this.delegateId : this.uid,
            realUid: this.uid,
            email: this.email,
            photoURL: this.photoURL,
            displayName: this.displayName,
        });
    }
}

export default User;