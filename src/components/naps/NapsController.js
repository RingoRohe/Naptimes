import Nap from 'models/Nap';

class NapsController {
    constructor(firebase, currentUser, runningNap) {
        this.firebase = firebase;
        this.currentUser = currentUser;
        this.runningNap = runningNap;
        this.db = this.firebase.firestore();
        this.runningNapListener = null;
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

    listenforRunningNap = (callback) => {
        if (this.runningNapListener === null) {
            const ref = this.db.collection(`users/${this.currentUser.uid}/naps`);
            let last = ref.orderBy('start').where('start', '>', 0).where('end', '==', 0).limit(1);
            this.runningNapListener = last.onSnapshot(snapshot => {
                if (snapshot.empty) {
                    callback(null);
                } else {
                    callback(snapshot.docs[0].data());
                }
            }, err => {
                console.log(`Encountered error: ${err}`);
            });
        }
    }
}

export default NapsController;