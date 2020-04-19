// React stuff
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import firebase from './libs/firebase/firebase';

// CSS and Libs
import 'assets/scss/App.scss';
import 'libs/loading_overlay/css/main.css'

// Components
import Login from 'pages/login/Login';
import Dashboard from 'pages/dashboard/Dashboard';
import Onboarding from "pages/onboarding/Onboarding";
import NavBar from 'components/menu/NavBar';
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import ProfileMenu from 'components/profile/ProfileMenuView';
import Naps from 'pages/naps/naps/Naps';
import EditNap from 'pages/naps/edit/EditNap';
import User from 'models/User';
import NapsController from 'controllers/NapsController';

function App() {
    let [currentUser, setCurrentUser] = useState(null);

    /*
    * ============================== Authentication
    */
    useEffect(() => {
        const unmountAuth = firebase.auth().onAuthStateChanged(function(authUser) {
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
    }, []);

    const createUserIfNotExists = (user) => {
        const newUserData = {
            uid: user.uid,
            email: user.email,
            photoURL: user.photoURL,
            displayName: user.displayName
        };
        firebase.firestore().collection('users').doc(user.uid).set(newUserData, { merge: true });

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

    /*
    * ============================== Naps
    */
    let [runningNap, setRunningNap] = useState(null);
    let [naps, setNaps] = useState([]);

    const napsFunctions = NapsController({
        setNaps,
        firebase,
        currentUser,
        runningNap,
        setRunningNap
    });

    return (
        <BrowserRouter>
        {currentUser
                ? <div className="wrapper">
                <Header />
                <NavBar currentUser={currentUser} />
                <ProfileMenu
                    currentUser={currentUser}
                    firebase={firebase}
                />
                <Route
                        exact
                        path="/"
                        render={props => (
                            <Dashboard
                                {...props}
                                firebase={firebase}
                                currentUser={currentUser}
                                napsFunctions={napsFunctions}
                                runningNap={runningNap}
                                naps={naps}
                            />
                        )}
                    />
                    <Route exact path="/naps" render={props => <Naps {...props} napsFunctions={napsFunctions} runningNap={runningNap} naps={naps} />} />
                    <Route exact path="/naps/edit/:id" render={props => <EditNap {...props} napsFunctions={napsFunctions} />} />
                <Route
                    exact
                    path="/login"
                    render={props => <Login {...props} firebase={firebase} />}
                />
                <Footer />
            </div>
            : <div className="wrapper">
                <Header />
                <NavBar currentUser={currentUser} />
                <ProfileMenu
                    currentUser={currentUser}
                    firebase={firebase}
                />
                <Onboarding />
                <Route
                    exact
                    path="/login"
                    render={props => <Login {...props} firebase={firebase} />}
                />
                <Footer />
            </div>
            }
        </BrowserRouter>
    );

}

export default App;
