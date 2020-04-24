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
            displayName: user.displayName
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
                } else {
                    let newUser = new User();
                    newUser.fromFirebaseDoc(doc);
                    setCurrentUser(newUser.asObject);
                }
            })
            .catch(err => { console.log("Error getting document", err); });
    }

    useEffect(() => {
        // console.log('UseEffect Hook in UserController called');
        const unmountAuth = firebase.auth().onAuthStateChanged(function (authUser) {
            if (authUser) {
                // User is signed in.
                createUserIfNotExists(authUser);
            } else {
                setCurrentUser(null);
            }
        });

        return () => {
            unmountAuth();
        };
    // eslint-disable-next-line
    }, [firebase, setCurrentUser]);

    const saveSettings = (settings, user) => {
        const newUserData = {
            settings
        };
        console.log(newUserData);
        firebase.firestore().collection('users').doc(user.uid).set(newUserData, { merge: true });

        getUser(user);
    }

    return {
        saveSettings
    };
}

UserController.propTypes = {
    setCurrentUser: PropTypes.func.isRequired
}

export default UserController
