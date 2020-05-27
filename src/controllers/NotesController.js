import PropTypes from 'prop-types'
import { useEffect } from 'react';
import Note from 'models/Note';
import User from 'models/User';

const NotesController = props => {
    const { currentUser, firebase, setNotes } = props;

    const createNote = (note, successCb, errorCb) => {
        const ref = props.firebase
            .firestore()
            .collection(`users/${props.currentUser.uid}/notes`);
        ref.add(note.toObject())
            .then(function () { if (successCb) { successCb(); } })
            .catch(function(error) {
                console.error("Error writing document: ", error);
                if (errorCb) { errorCb(error); }
            });
    };

    const updateNote = (note, successCb, errorCb) => {
        const ref = props.firebase.firestore().collection(`users/${props.currentUser.uid}/notes`);
        ref.doc(note.id)
            .update(note.toObject())
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

    const deleteNote = (note, successCb, errorCb) => {
        const ref = props.firebase.firestore().collection(`users/${props.currentUser.uid}/notes`);
        ref.doc(note.id).delete()
            .then(function () {
                if (successCb) {
                    successCb();
                }
            })
            .catch(function (error) {
                console.error("Error updating document: ", error);
                if (errorCb) {
                    errorCb();
                }
            });
    };

    const getNoteById = (id, success, error) => {
        const doc = props.firebase
            .firestore()
            .collection(`users/${props.currentUser.uid}/notes/`)
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

    const getNotes = (...args) => {
        if (!props.currentUser || !props.currentUser.uid) {
            return false;
        }

        let ref = props.firebase.firestore().collection(`users/${props.currentUser.uid}/notes`);

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

    // get Notes of last days
    useEffect(() => {
        // console.log("NotesController mounted");

        if (currentUser && currentUser.uid) {
            let dateOffset = 24 * 60 * 60 * 1000 * 14; // 14 days
            let firstDayStart = new Date();
            firstDayStart.setHours(0, 0, 0, 0);
            firstDayStart.setTime(firstDayStart.getTime() - dateOffset);
            let lastDayEnd = new Date();
            lastDayEnd.setHours(23, 59, 59, 999);

            let ref = firebase
                .firestore()
                .collection(`users/${currentUser.uid}/notes`);
            let unbindFirestore = ref
                .where("time", ">=", firstDayStart.getTime())
                .where("time", "<=", lastDayEnd.getTime())
                .orderBy("time", "desc")
                .onSnapshot((snapshot) => {
                    let notes = [];
                    if (!snapshot.empty) {
                        // filter unfinished notes
                        snapshot.forEach((doc) => {
                            let note = new Note();
                            note.fromFirebaseDoc(doc);
                            notes.push(note);
                        });
                        setNotes(notes);
                    } else {
                        setNotes([]);
                    }
                });

            return () => {
                unbindFirestore();
                // console.log("NotesController unmounted");
            };
        }
    }, [currentUser, firebase, setNotes]);

    return {
        createNote,
        updateNote,
        deleteNote,
        getNoteById,
        getNotes
    };
}

NotesController.propTypes = {
    setNotes: PropTypes.func.isRequired,
    currentUser: PropTypes.objectOf(User).isRequired
}

export default NotesController
