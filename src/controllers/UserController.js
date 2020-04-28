import PropTypes from 'prop-types'
import { useEffect } from 'react';
import User from 'models/User';

const UserController = props => {
    const { setCurrentUser, firebase } = props;

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
                }
            })
            .catch(err => {
                console.log("Error getting document", err);
                console.log('trying to create User now');

                createUserIfNotExists(user);
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
        const unmountAuth = firebase.auth().onAuthStateChanged(function (authUser) {
            if (authUser) {
                // User is signed in.
                getUser(authUser);
            } else {
                setCurrentUser(null);
            }
        });

        return () => {
            unmountAuth();
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

    return {
        saveSettings
    };
}

UserController.propTypes = {
    setCurrentUser: PropTypes.func.isRequired
}

export default UserController
