// React stuff
import React, { useState } from 'react';
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
import Diapers from 'pages/diapers/Diapers';
import Bodydata from 'pages/bodydata/Bodydata';
import Settings from 'pages/settings/Settings';

// Controllers
import NapsController from 'controllers/NapsController';
import UserController from 'controllers/UserController';
import DiapersController from 'controllers/DiapersController';

// Libs
import { toast } from "react-toastify";
import EditDiaper from 'pages/diapers/edit/EditDiaper';
import BodydataController from 'controllers/BodydataController';

function App() {
    toast.configure({
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
        closeButton: false,
        draggablePercent: 60,
        hideProgressBar: true
    });

    /*
    * ============================== Authentication
    */
    let [currentUser, setCurrentUser] = useState(null);

    const userController = UserController({
        firebase,
        setCurrentUser
    });

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

    /*
    * ============================== Diapers
    */
    let [diapers, setDiapers] = useState([]);

    const diapersController = DiapersController({
        setDiapers,
        firebase,
        currentUser
    });

    /*
    * ============================== Bodydata
    */
    let [measurements, setMeasurements] = useState([]);

    const bodydataController = BodydataController({
        setMeasurements,
        firebase,
        currentUser
    });

    return (
        <BrowserRouter>
            {currentUser ? (
                <div className="wrapper">
                    <Header />
                    <NavBar currentUser={currentUser} />
                    <ProfileMenu
                        currentUser={currentUser}
                        firebase={firebase}
                    />
                    <Route
                        exact
                        path="/"
                        render={(props) => (
                            <Dashboard
                                {...props}
                                firebase={firebase}
                                currentUser={currentUser}
                                napsFunctions={napsFunctions}
                                diapersController={diapersController}
                                runningNap={runningNap}
                                naps={naps}
                                diapers={diapers}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/naps"
                        render={(props) => (
                            <Naps
                                {...props}
                                napsFunctions={napsFunctions}
                                runningNap={runningNap}
                                naps={naps}
                                currentUser={currentUser}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/naps/edit/:id"
                        render={(props) => (
                            <EditNap {...props} napsFunctions={napsFunctions} />
                        )}
                    />
                    <Route
                        exact
                        path="/login"
                        render={(props) => (
                            <Login {...props} firebase={firebase} />
                        )}
                    />
                    <Route
                        exact
                        path="/diapers"
                        render={(props) => (
                            <Diapers
                                {...props}
                                currentUser={currentUser}
                                diapersController={diapersController}
                                diapers={diapers}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/diapers/edit/:id"
                        render={(props) => (
                            <EditDiaper {...props} diapersController={diapersController} />
                        )}
                    />
                    <Route
                        exact
                        path="/bodydata"
                        render={(props) => (
                            <Bodydata
                                {...props}
                                currentUser={currentUser}
                                measurements={measurements}
                                bodydataController={bodydataController}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/settings"
                        render={(props) => (
                            <Settings
                                {...props}
                                currentUser={currentUser}
                                userController={userController}
                            />
                        )}
                    />
                    <Footer />
                </div>
            ) : (
                <div className="wrapper">
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
                        render={(props) => (
                            <Login {...props} firebase={firebase} />
                        )}
                    />
                    <Footer />
                </div>
            )}
        </BrowserRouter>
    );

}

export default App;
