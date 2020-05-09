// React
import {useEffect} from 'react'
import PropTypes from 'prop-types'

// Models
import Measurement from 'models/Measurement';

const BodydataController = props => {
    const { firebase, currentUser, setMeasurements } = props;

    const createMeasurement = (measurement, successCb, errorCb) => {
        const ref = firebase
            .firestore()
            .collection(`users/${currentUser.uid}/measurements`);
        ref.add(measurement.toObject())
            .then(function () { if (successCb) { successCb(); } })
            .catch(function(error) {
                console.error("Error writing document: ", error);
                if (errorCb) { errorCb(); }
            });
    };

    const updateMeasurement = (measurement, successCb, errorCb) => {
        const ref = firebase.firestore().collection(`users/${currentUser.uid}/measurements`);
        ref.doc(measurement.id)
            .update(measurement.toObject())
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

    const deleteMeasurement = (measurement, successCb, failureCb) => {
        const ref = firebase.firestore().collection(`users/${currentUser.uid}/measurements`);
        ref.doc(measurement.id)
            .delete()
            .then(function () {
                if (successCb) {
                    successCb();
                }
            })
            .catch(function (error) {
                console.error("Error deleting document: ", error);
                if (failureCb) {
                    failureCb(error);
                }
            });;
    };

    const getMeasurementById = (id, successCb, failureCb) => {
        const doc = firebase
            .firestore()
            .collection(`users/${currentUser.uid}/measurements/`)
            .doc(id)
            .get()
            .then(doc => {
                if (!doc.exists) {
                    console.log("No such document!");
                    if (failureCb) {
                        failureCb();
                    }
                } else {
                    if (successCb) {
                        successCb(doc);
                    }
                }
            })
            .catch(err => {
                console.log("Error getting document", err);
                if (failureCb) {
                    failureCb(err);
                }
            });
        return (doc);
    };

    const getMeasurements = (...args) => {
        if (!currentUser || !currentUser.uid) {
            return false;
        }

        let ref = firebase.firestore().collection(`users/${currentUser.uid}/measurements`);

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
                .where("time", ">=", parseInt(todayMorning.getTime()))
                .where("time", "<=", parseInt(todayEvening.getTime()))
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

    // get Measurements of last days
    useEffect(() => {
        // console.log("MeasurementsController mounted");

        if (currentUser && currentUser.uid) {
            let dateOffset = 24 * 60 * 60 * 1000 * 14; // 14 days
            let firstDayStart = new Date();
            firstDayStart.setHours(0, 0, 0, 0);
            firstDayStart.setTime(firstDayStart.getTime() - dateOffset);
            let lastDayEnd = new Date();
            lastDayEnd.setHours(23, 59, 59, 999);

            let ref = firebase
                .firestore()
                .collection(`users/${currentUser.uid}/measurements`);
            let unbindFirestore = ref
                .where("time", ">=", firstDayStart.getTime())
                .where("time", "<=", lastDayEnd.getTime())
                .orderBy("time", "desc")
                .onSnapshot((snapshot) => {
                    let measurements = [];
                    if (!snapshot.empty) {
                        snapshot.forEach((doc) => {
                            let measurement = new Measurement();
                            measurement.fromFirebaseDoc(doc);
                            measurements.push(measurement);
                        });
                        setMeasurements(measurements);
                    } else {
                        setMeasurements([]);
                    }
                });

            return () => {
                unbindFirestore();
                // console.log("MeasurementsController unmounted");
            };
        }
    }, [currentUser, firebase, setMeasurements]);
    
    return ({
        createMeasurement,
        updateMeasurement,
        deleteMeasurement,
        getMeasurementById,
        getMeasurements
    });
}

BodydataController.propTypes = {
    firebase: PropTypes.any,
    currentUser: PropTypes.object.isRequired,
    setMeasurements: PropTypes.func.isRequired
}

export default BodydataController
