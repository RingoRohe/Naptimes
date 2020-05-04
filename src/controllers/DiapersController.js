import PropTypes from 'prop-types'
import { useEffect } from 'react';
import Diaper from 'models/Diaper';
import User from 'models/User';

const DiapersController = props => {
    const { currentUser, firebase, setDiapers } = props;

    const createDiaper = (diaper, successCb, errorCb) => {
        const ref = props.firebase
            .firestore()
            .collection(`users/${props.currentUser.uid}/diapers`);
        ref.add(diaper.toObject())
            .then(function () { if (successCb) { successCb(); } })
            .catch(function(error) {
                console.error("Error writing document: ", error);
                if (errorCb) { errorCb(); }
            });
    };

    const updateDiaper = (diaper, successCb, errorCb) => {
        const ref = props.firebase.firestore().collection(`users/${props.currentUser.uid}/diapers`);
        ref.doc(diaper.id)
            .update(diaper.toObject())
            .then(function() {
                if (successCb) {
                    successCb();
                }
            })
            .catch(function(error) {
                console.error("Error updating document: ", error);
                if (errorCb) {
                    errorCb();
                }
            });
    };

    const deleteDiaper = diaper => {
        const ref = props.firebase.firestore().collection(`users/${props.currentUser.uid}/diapers`);
        ref.doc(diaper.id).delete();
    };

    const getDiaperById = (id, success, error) => {
        const doc = props.firebase
            .firestore()
            .collection(`users/${props.currentUser.uid}/diapers/`)
            .doc(id)
            .get()
            .then(doc => {
                if (!doc.exists) {
                    console.log("No such document!");
                    if (error) {
                        error();
                    }
                } else {
                    if (success) {
                        success(doc);
                    }
                }
            })
            .catch(err => {
                console.log("Error getting document", err);
                if (error) {
                    error();
                }
            });
        return (doc);
    };

    const getDiapers = (...args) => {
        if (!props.currentUser || !props.currentUser.uid) {
            return false;
        }

        let ref = props.firebase.firestore().collection(`users/${props.currentUser.uid}/diapers`);

        if (!isNaN(args[0]) && parseInt(args[0]) < 100) {
            // get last n Items
            return ref.orderBy('time', 'desc').limit(parseInt(args[0]));
        }

        if (args.length === 0) {
            // get all Items of today
            let todayMorning = new Date();
            todayMorning.setHours(0, 0, 0, 0);
            let todayEvening = new Date();
            todayEvening.setHours(23, 59, 59, 999);
            return ref
                .orderBy("time", "desc");
        }

        if (parseInt(args[0]) > 100 && parseInt(args[1]) > 100) {
            // get all Items between given timestamps
            return ref
                .where("time", ">=", parseInt(args[0]))
                .where("time", "<=", parseInt(args[1]))
                .orderBy("time", "desc");
        }
    };

    // get Naps of last days
    useEffect(() => {
        // console.log("DiapersController mounted");

        if (currentUser && currentUser.uid) {
            let dateOffset = 24 * 60 * 60 * 1000 * 14; // 14 days
            let firstDayStart = new Date();
            firstDayStart.setHours(0, 0, 0, 0);
            firstDayStart.setTime(firstDayStart.getTime() - dateOffset);
            let lastDayEnd = new Date();
            lastDayEnd.setHours(23, 59, 59, 999);

            let ref = firebase
                .firestore()
                .collection(`users/${currentUser.uid}/diapers`);
            let unbindFirestore = ref
                .where("time", ">=", firstDayStart.getTime())
                .where("time", "<=", lastDayEnd.getTime())
                .orderBy("time", "desc")
                .onSnapshot((snapshot) => {
                    let diapers = [];
                    if (!snapshot.empty) {
                        // filter unfinished diapers
                        snapshot.forEach((doc) => {
                            let diaper = new Diaper();
                            diaper.fromFirebaseDoc(doc);
                            diapers.push(diaper);
                        });
                        setDiapers(diapers);
                    } else {
                        setDiapers([]);
                    }
                });

            return () => {
                unbindFirestore();
                // console.log("DiapersController unmounted");
            };
        }
    }, [currentUser, firebase, setDiapers]);

    return {
        createDiaper,
        updateDiaper,
        deleteDiaper,
        getDiaperById,
        getDiapers
    };
}

DiapersController.propTypes = {
    setDiapers: PropTypes.func.isRequired,
    currentUser: PropTypes.objectOf(User).isRequired
}

export default DiapersController
