import Nap from 'models/Nap';

class NapsController {
    constructor(firebase, currentUser, runningNap) {
        this.runningNap = runningNap;
        this.firebase = firebase;
        this.currentUser = currentUser;
        this.db = this.firebase.firestore();
    }
    
    startNap = () => {
        let newNap = new Nap(Date.now());
        const ref = this.db.collection(`users/${this.currentUser.uid}/naps`);
        ref.add(newNap.toObject())
        .then(function () {
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
    }

    finishNap = () => {
        const ref = this.db.collection(`users/${this.currentUser.uid}/naps`);
        ref.doc(this.runningNap.id).update({end: Date.now()});
    }

    getRunningNap = () => {
        return this.runningNap;
    }
}

export default NapsController;