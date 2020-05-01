import PropTypes from 'prop-types'
import { useEffect } from 'react';
import Nap from 'models/Nap';
import User from 'models/User';

const NapsController = props => {
    const { currentUser, firebase, setRunningNap, setNaps } = props;

    const isNapRunning = () => {
        return props.runningNap ? true : false;
    }

    const startNap = (startDate) => {
        let newNap = null;
        if (startDate && startDate instanceof Date) {
            newNap = new Nap(startDate.getTime());
        } else {
            newNap = new Nap(Date.now());
        }
        const ref = props.firebase.firestore().collection(`users/${props.currentUser.uid}/naps`);
        ref.add(newNap.toObject())
            .then(function() {})
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
    };

    const finishNap = () => {
        const ref = props.firebase.firestore().collection(`users/${props.currentUser.uid}/naps`);
        ref.doc(props.runningNap.id).update({ end: Date.now() });
    };

    const createNap = (nap, success) => {
        const ref = props.firebase
            .firestore()
            .collection(`users/${props.currentUser.uid}/naps`);
        ref.add(nap.toObject())
            .then(function () { if (success) { success(); } })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
    };

    const updateNap = (nap, success, error) => {
        const ref = props.firebase.firestore().collection(`users/${props.currentUser.uid}/naps`);
        ref.doc(nap.id)
            .update(nap.toObject())
            .then(function() {
                if (success) {
                    success();
                }
            })
            .catch(function(error) {
                console.error("Error updating document: ", error);
                if (error) {
                    error();
                }
            });
    };

    const deleteNap = nap => {
        const ref = props.firebase.firestore().collection(`users/${props.currentUser.uid}/naps`);
        ref.doc(nap.id).delete();
    };

    const getNapById = (id, success, error) => {
        const doc = props.firebase
            .firestore()
            .collection(`users/${props.currentUser.uid}/naps/`)
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

    const getNaps = (...args) => {
        if (!props.currentUser || !props.currentUser.uid) {
            return false;
        }

        let ref = props.firebase.firestore().collection(`users/${props.currentUser.uid}/naps`);

        if (!isNaN(args[0]) && parseInt(args[0]) < 100) {
            // get last n Items
            return ref.where('end', '>', 0).orderBy('end', 'desc').limit(parseInt(args[0]));
        }

        if (args.length === 0) {
            // get all Items of today
            let todayMorning = new Date();
            todayMorning.setHours(0, 0, 0, 0);
            let todayEvening = new Date();
            todayEvening.setHours(23, 59, 59, 999);
            return ref
                .where("start", ">=", todayMorning.getTime())
                .where("start", "<=", todayEvening.getTime())
                .orderBy("start", "desc");
        }

        if (parseInt(args[0]) > 100 && parseInt(args[1]) > 100) {
            // get all Items between given timestamps
            return ref
                .where("start", ">=", parseInt(args[0]))
                .where("start", "<=", parseInt(args[1]))
                .orderBy("start", "desc");
        }
    };

    // bind to running nap
    useEffect(() => {
        // console.log('useEffect for running Nap');

        // bind to running nap
        if (currentUser && currentUser.uid) {
            const ref = firebase.firestore().collection(`users/${currentUser.uid}/naps`);
            let last = ref.orderBy('start').where('start', '>', 0).where('end', '==', 0).limit(1);
            const unmountRunningNapListener = last.onSnapshot(snapshot => {
                if (snapshot.empty) {
                    setRunningNap(null);
                } else {
                    const nap = new Nap();
                    nap.fromFirebaseDoc(snapshot.docs[0]);
                    setRunningNap(nap);
                }
            }, err => {
                console.log(`Encountered error: ${err}`);
            });
            return () => {
                unmountRunningNapListener();
            };
        }

    }, [currentUser, firebase, setRunningNap]);

    // get Naps of last days
    useEffect(() => {
        // console.log("NapsController mounted");

        if (currentUser && currentUser.uid) {
            let dateOffset = 24 * 60 * 60 * 1000 * 14; // 14 days
            let firstDayStart = new Date();
            firstDayStart.setHours(0, 0, 0, 0);
            firstDayStart.setTime(firstDayStart.getTime() - dateOffset);
            let lastDayEnd = new Date();
            lastDayEnd.setHours(23, 59, 59, 999);

            let ref = firebase
                .firestore()
                .collection(`users/${currentUser.uid}/naps`);
            let unbindFirestore = ref
                .where("start", ">=", firstDayStart.getTime())
                .where("start", "<=", lastDayEnd.getTime())
                .orderBy("start", "desc")
                .onSnapshot((snapshot) => {
                    let naps = [];
                    if (!snapshot.empty) {
                        // filter unfinished naps
                        snapshot.forEach((doc) => {
                            if (doc.data().end > 0) {
                                let nap = new Nap();
                                nap.fromFirebaseDoc(doc);
                                naps.push(nap);
                            }
                        });
                        setNaps(naps);
                    } else {
                        setNaps([]);
                    }
                });

            return () => {
                unbindFirestore();
                // console.log("NapsController unmounted");
            };
        }
    }, [currentUser, firebase, setNaps]);

    return {
        isNapRunning,
        startNap,
        finishNap,
        createNap,
        updateNap,
        deleteNap,
        getNapById,
        getNaps
    };
}

NapsController.propTypes = {
    setNaps: PropTypes.func.isRequired,
    setRunningNap: PropTypes.func.isRequired,
    currentUser: PropTypes.objectOf(User).isRequired
}

export default NapsController
