class User {
    constructor(uid, email, photoURL, displayName) {
        uid ? this.uid = uid : this.uid = "";
        email ? this.email = email : this.email = "";
        photoURL ? this.photoURL = photoURL : this.photoURL = "";
        displayName ? this.displayName = displayName : this.displayName = "";
        this.delegateId = null;
    }

    fromFirebaseDoc(object) {
        this.uid = object.data().uid;
        this.email = object.data().email;
        this.photoURL = object.data().photoURL;
        this.displayName = object.data().displayName;
        object.data().delegateId ? this.delegateId = object.data().delegateId : this.delegateId = null;
    }

    get asObject() {
        return ({
            uid: this.delegateId ? this.delegateId : this.uid,
            email: this.email,
            photoURL: this.photoURL,
            displayName: this.displayName,
        });
    }
}

export default User;