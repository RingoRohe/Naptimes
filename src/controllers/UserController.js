// React
import PropTypes from 'prop-types'
import { useEffect } from 'react';

// Models
import User from 'models/User';

// Libs
import { toast } from "react-toastify";

const UserController = props => {
    const { setCurrentUser, firebase } = props;

    let toastId = null;

    const createUserIfNotExists = (user) => {
        const newUserData = {
            uid: user.uid,
            email: user.email,
            photoURL: user.photoURL,
            displayName: user.displayName,
            settings: {
                childName: 'your Buddy'
            }
        };
        firebase.firestore().collection('users').doc(user.uid).set(newUserData, { merge: true });

        getUser(user);
    }

    const getUser = user => {
        // get Userdata
        setToast("load Userdata...");
        firebase.firestore().collection('users').doc(user.uid).get()
            .then(doc => {
                if (!doc.exists) {
                    console.log("No such User!");
                    console.log('trying to create User now');

                    createUserIfNotExists(user);
                } else {
                    let newUser = new User();
                    newUser.fromFirebaseDoc(doc);
                    if (newUser.isDelegated()) {
                        newUser.settings = getSettings(newUser, (user) => {
                            setCurrentUser(user.asObject);
                        });
                    } else {
                        setCurrentUser(newUser.asObject);
                    }
                    toast.dismiss(toastId);
                }
            })
            .catch(err => {
                console.log("Error getting document", err);
                setToast('Error getting User!', toast.TYPE.ERROR);
            });
    }

    const getSettings = (user, cb) => {
        let id = user.isDelegated ? user.delegateId : user.uid;
        firebase.firestore().collection('users').doc(id).get()
            .then(doc => {
                if (doc.exists) {
                    let tempUser = new User();
                    tempUser.fromFirebaseDoc(doc);
                    if (cb && typeof (cb) === 'function') {
                        user.settings = tempUser.settings;
                        cb(user);
                    } else {
                        return tempUser.settings;
                    }
                } else {
                    if (cb && typeof (cb) === 'function') {
                        cb(user);
                    } else {
                        return user.settings;
                    }
                }
            })
            .catch(err => {
                console.log("Error getting document", err);

                return(user.settings);
            });
        return null;
    }

    useEffect(() => {
        // console.log('UseEffect Hook in UserController called');
        setToast("logging in...", toast.TYPE.INFO);
        const unmountAuth = firebase.auth().onAuthStateChanged(function (authUser) {
            if (authUser) {
                // User is signed in.
                getUser(authUser);
            } else {
                setCurrentUser(null);
                toast.dismiss(toastId);
            }
        });

        return () => {
            unmountAuth();
            toast.dismiss(toastId);
        };
    // eslint-disable-next-line
    }, [firebase, setCurrentUser]);

    const saveSettings = (settings, user, success, error) => {
        const newUserData = {
            settings
        };
        firebase.firestore().collection('users').doc(user.uid).set(newUserData, { merge: true })
            .then((doc) => {
                getUser(user);
                if (success && typeof (success) === 'function') success();
            })
            .catch(err => {
                if (error && typeof error === "function") error();
            });
    }

    const setToast = (text, type) => {
        if (toastId === null) {
            toastId = toast(text, {
                autoClose: false,
                type: type || toast.TYPE.INFO
            });
        } else {
            toast.update(toastId, {
                render: text,
                type: type || toast.TYPE.INFO
            });
        }
    }

    return {
        saveSettings
    };
}

UserController.propTypes = {
    setCurrentUser: PropTypes.func.isRequired
}

export default UserController
