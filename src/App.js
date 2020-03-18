import React, { useState } from 'react';
import firebase from './firebase/firebase';
import './App.css';

import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';

function App() {
    let [user, setUser] = useState(null);

    // Authentication
    firebase.auth().onAuthStateChanged(function (authUser) {
        if (authUser) {
            // User is signed in.
            console.log(authUser);
            setUser(authUser);
        } else {
            setUser(null);
        }
    });

    const onLogoutClicked = () => {
        firebase.auth().signOut();
    }

    if (user) {
        return (
            <div className="App">
                <Dashboard onLogoutClicked={onLogoutClicked} />
            </div>
        );
    } else {
        return (
            <div className="App">
                <Login />
            </div>
        );
    }

}

export default App;
