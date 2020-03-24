import React, { useState, useEffect } from 'react';
import firebase from './firebase/firebase';
import 'App.scss';
import 'libs/loading_overlay/css/main.css'

import Login from 'components/login/Login';
import Dashboard from 'components/dashboard/Dashboard';

function App() {
    let [user, setUser] = useState(null);

    useEffect(() => {
        // component did mount

        // Authentication
        const unmountAuth = firebase.auth().onAuthStateChanged(function(authUser) {
            if (authUser) {
                // User is signed in.
                setUser(authUser);
                createUserIfNotExists(authUser);
            } else {
                setUser(null);
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

    if (user) {
        return <Dashboard firebase={firebase} user={user} />;
    } else {
        return <Login firebase={firebase} />
    }

}

export default App;
