// React stuff
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import firebase from './libs/firebase/firebase';

// CSS and Libs
import 'assets/scss/App.scss';
import 'libs/loading_overlay/css/main.css'

// Models
import Nap from 'models/Nap';

// Components
import Login from 'pages/login/Login';
import Dashboard from 'pages/dashboard/Dashboard';
import NavBar from 'components/menu/NavBar';
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import ProfileMenu from 'components/profile/ProfileMenuView';
import Modal from "components/shared/modal/Modal";
import Naps from 'pages/naps/Naps';

function App() {
    // Authentication
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

    // Modal View
    let [modalContent, setModalContent] = useState("");
    let [modalVisibility, setModalVisibility] = useState(false);
    const modal = {
        setContent: (content) => setModalContent(content),
        toggleVisibility: () => setModalVisibility(!modalVisibility),
        hide: () => setModalVisibility(false),
        show: () => setModalVisibility(true),
        modalVisibility,
        modalContent
    };

    // Naps
    let [runningNap, setRunningNap] = useState(null);
    // const nc = new NapsController(props.firebase, props.currentUser, runningNap);
    useEffect(() => {
        // console.log('useEffect in Dashboard.js');

        // bind to running nap
        if (currentUser && currentUser.uid) {
            const ref = firebase.firestore().collection(`users/${currentUser.uid}/naps`);
            let last = ref.orderBy('start').where('start', '>', 0).where('end', '==', 0).limit(1);
            const unmountRunningNapListener = last.onSnapshot(snapshot => {
                if (snapshot.empty) {
                    setRunningNap(null);
                } else {
                    const nap = new Nap();
                    nap.fromFirebaseDoc(snapshot.docs[0]);
                    setRunningNap(nap);
                }
            }, err => {
                console.log(`Encountered error: ${err}`);
            });
            return () => {
                unmountRunningNapListener();
            };
        }

    }, [currentUser]);
    
    const naps = {
        isNapRunning: () => {
            return runningNap ? true : false;
        },
        startNap: () => {
            let newNap = new Nap(Date.now());
            const ref = firebase.firestore().collection(`users/${currentUser.uid}/naps`);
            ref.add(newNap.toObject())
                .then(function() {})
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
        },
        finishNap: () => {
            const ref = firebase.firestore().collection(`users/${currentUser.uid}/naps`);
            ref.doc(runningNap.id).update({ end: Date.now() });
        },
        createNap: (nap, success) => {
            const ref = firebase
                .firestore()
                .collection(`users/${currentUser.uid}/naps`);
            ref.add(nap.toObject())
                .then(function () { if (success) { success(); } })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
        },
        deleteNap: nap => {
            const ref = firebase.firestore().collection(`users/${currentUser.uid}/naps`);
            ref.doc(nap.id).delete();
        },
        getNaps: (...args) => {
            if (!currentUser || !currentUser.uid) {
                return false;
            }

            let ref = firebase.firestore().collection(`users/${currentUser.uid}/naps`);

            if (!isNaN(args[0]) && parseInt(args[0]) < 100) {
                // get last n Items
                return ref.where('end', '>', 0).orderBy('end', 'desc').limit(parseInt(args[0]));
            }

            if (args.length === 0) {
                // get all Items of today
                let from = Date.now() - 1 * 24 * 60 * 60 * 1000; // - 1 day
                let to = Date.now();
                return ref
                    .where("start", ">=", from)
                    .where("start", "<=", to)
                    .orderBy("start", "desc");
            }
        }
    };

    return (
        <BrowserRouter>
            <div className="wrapper">
                <Header />
                <NavBar currentUser={currentUser} />
                <ProfileMenu
                    currentUser={currentUser}
                    firebase={firebase}
                    modal={modal}
                />
                <Route
                    exact
                    path="/"
                    render={props => (
                        <Dashboard
                            {...props}
                            firebase={firebase}
                            currentUser={currentUser}
                            naps={naps}
                            runningNap={runningNap}
                            modal={modal}
                        />
                    )}
                />
                <Route exact path="/naps" render={props => <Naps {...props} naps={naps} runningNap={runningNap} modal={modal} />} />
                <Route
                    exact
                    path="/login"
                    render={props => <Login {...props} firebase={firebase} />}
                />
                <Footer />
                <Modal modal={modal}>{modalContent}</Modal>
            </div>
        </BrowserRouter>
    );

}

export default App;
