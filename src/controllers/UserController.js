// React
import PropTypes from 'prop-types'
import { useEffect } from 'react';

// Models
import User from 'models/User';

// Libs
import { toast } from "react-toastify";
import Settings from 'models/Settings';

const UserController = props => {
    const { setCurrentUser, firebase } = props;

    let toastId = null;

    const createUserIfNotExists = (user) => {
        const newUserData = {
            uid: user.uid,
            email: user.email,
            photoURL: user.photoURL,
            displayName: user.displayName
        };
        firebase.firestore().collection('users').doc(user.uid).set(newUserData, { merge: true })
            .then(() => {
                getUser(user);
            });
    }

    const createSettingsIfNotExists = (user, cb) => {
        const newSettingsData = {
            childName: 'your Buddy'
        };
        firebase
            .firestore()
            .collection("usersettings")
            .doc(user.uid)
            .set(newSettingsData, { merge: true })
            .then(() => {
                getSettings(user, cb);
            });
    };

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
                    getSettings(newUser.asObject, (settings) => {
                        newUser.setSettings(settings);
                        setCurrentUser(newUser.asObject);
                    });
                    toast.dismiss(toastId);
                }
            })
            .catch(err => {
                console.log("Error getting document", err);
                setToast('Error getting User!', toast.TYPE.ERROR);
            });
    }

    const getDelegateUsers = (user, successCb, failureCb) => {
        firebase.firestore().collection('users')
            .where('delegateId', '==', user.uid)
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    if (successCb && typeof (successCb) === 'function') {
                        successCb([]);
                    }
                    return;
                }

                let delegateUsers = [];
                snapshot.forEach(doc => {
                    let newUser = new User();
                    newUser.fromFirebaseDoc(doc);
                    delegateUsers.push(newUser);
                });
                if (successCb && typeof (successCb) === 'function') {
                    successCb(delegateUsers);
                }
            })
            .catch(err => {
                console.log("Error getting document", err);
                if (failureCb && typeof (failureCb) === 'function') {
                    failureCb(err);
                }
            });
    }

    const getSettings = (user, cb) => {
        let id = user.uid;
        firebase.firestore().collection('usersettings').doc(id).get()
            .then(doc => {
                if (doc.exists) {
                    let tempSettings = new Settings();
                    tempSettings.fromFirebaseDoc(doc);
                    if (cb && typeof (cb) === 'function') {
                        cb(tempSettings.asObject);
                    } else {
                        return tempSettings.asObject;
                    }
                } else {
                    createSettingsIfNotExists(user, cb);
                }
            })
            .catch(err => {
                console.log("Error getting document", err);
                return({});
            });
        return {};
    }

    const saveSettings = (settings, user, success, error) => {
        firebase
            .firestore()
            .collection("usersettings")
            .doc(user.uid)
            .set(settings, { merge: true })
            .then(() => {
                getUser(user);
                if (success && typeof success === "function") success();
            })
            .catch((err) => {
                if (error && typeof error === "function") error();
            });
    };

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
        saveSettings,
        getDelegateUsers
    };
}

UserController.propTypes = {
    setCurrentUser: PropTypes.func.isRequired
}

export default UserController
