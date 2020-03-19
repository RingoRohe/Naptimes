import React, { useState, useEffect } from 'react';
import firebase from './firebase/firebase';
import 'App.scss';

import Login from 'components/login/Login';
import Dashboard from 'components/Dashboard';

function App() {
    let [user, setUser] = useState(null);

    useEffect(() => {
        // component did mount

        // Authentication
        const unmountAuth = firebase.auth().onAuthStateChanged(function(authUser) {
            if (authUser) {
                // User is signed in.
                setUser(authUser);
            } else {
                setUser(null);
            }
        });

        return () => {
            // component will unmount
            unmountAuth();
        };
    }, []);

    if (user) {
        return <Dashboard firebase={firebase} user={user} />;
    } else {
        return <Login firebase={firebase} />
    }

}

export default App;
