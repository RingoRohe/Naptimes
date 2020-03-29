import Nap from 'models/Nap';

class NapsController {
    constructor(firebase, currentUser, runningNap) {
        this.runningNap = runningNap;
        this.firebase = firebase;
        this.currentUser = currentUser;
        this.db = this.firebase.firestore();
    }

    getRunningNap = () => {
        return this.runningNap;
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

    deleteNap = (nap) => {
        const ref = this.db.collection(`users/${this.currentUser.uid}/naps`);
        ref.doc(nap.id).delete();
    }

    getNaps = (...args) => {
        if (!this.currentUser || !this.currentUser.uid) {
            return false;
        }

        let ref = this.db.collection(`users/${this.currentUser.uid}/naps`);

        if (!isNaN(args[0]) && parseInt(args[0]) < 100) {
            // get last n Items
            return ref.orderBy('start', 'desc').limit(parseInt(args[0]));
        }
        
        if (args.length === 0) {
            // get all Items of today
            let from = Date.now() - (1 * 24 * 60 * 60 * 1000); // - 1 day
            let to = Date.now();
            return ref.where('start', '>=', from).where('start', '<=', to).orderBy('start', 'desc')
        }

    }
}

export default NapsController;