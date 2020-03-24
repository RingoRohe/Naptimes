import Nap from 'models/Nap';
import firebase from '../../firebase/firebase';

class NapsController {
    constructor() {
        this.newNap = new Nap(Math.floor(Date.now() / 1000));
    }
    
    createNewNap = (user) => {
        const db = firebase.firestore();
        const ref = db.collection("users").doc(user.uid).collection('naps');
        ref.add(this.newNap.toObject())
        .then(function () {
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
    }
}

export default NapsController;