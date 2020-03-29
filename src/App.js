import React, { useState, useEffect } from 'react';
import firebase from './firebase/firebase';
import 'assets/scss/App.scss';
import 'libs/loading_overlay/css/main.css'

import Login from 'components/login/Login';
import Dashboard from 'components/dashboard/Dashboard';

function App() {
    let [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // component did mount

        // Authentication
        const unmountAuth = firebase.auth().onAuthStateChanged(function(authUser) {
            if (authUser) {
                // User is signed in.
                setCurrentUser(authUser);
                createUserIfNotExists(authUser);
            } else {
                setCurrentUser(null);
            }
        });

        return () => {
            // component will unmount
            unmountAuth();
        };
    }, []);

    const createUserIfNotExists = (user) => {
        const newUserData = {
            email: user.email,
            photoURL: user.photoURL,
            displayName: user.displayName
        };
        firebase.firestore().collection('users').doc(user.uid).set(newUserData, { merge: true });
    }

    if (currentUser) {
        return <Dashboard firebase={firebase} currentUser={currentUser} />;
    } else {
        return <Login firebase={firebase} />
    }

}

export default App;
