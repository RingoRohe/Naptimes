// react stuff
import React from 'react';
import { useEffect } from "react";
import { useState } from 'react';

// models
import Nap from "models/Nap";

// components
import ProfileMenu from 'components/profile/ProfileMenuView';
// import Users from 'components/dashboard/Users';
import NapsController from 'components/naps/NapsController';
import MainMenu from 'components/menu/MainMenu';
import Modal from 'components/modal/Modal';
import RunningNapWidget from 'components/naps/RunningNapWidget';
import LastNapsWidget from 'components/naps/LastNapsWidget';

const Dashboard = (props) => {
    // Modal
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
    const nc = new NapsController(props.firebase, props.currentUser, runningNap);
    useEffect(() => {
        // console.log('useEffect in Dashboard.js');

        // bind to running nap
        const ref = props.firebase.firestore().collection(`users/${props.currentUser.uid}/naps`);
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
    }, [props.firebase, props.currentUser]);

    const onLogoutClicked = () => {
        props.firebase.auth().signOut();
    };
    
    return (
        <div className="wrapper">
            <header>
                <h1>
                    Naptimes{" "}
                    <span role="img" aria-label="baby">
                        👶🏻
                    </span>
                </h1>
            </header>
            <nav className="mainMenu">
                <MainMenu napsController={nc} modal={modal} />
            </nav>
            <ProfileMenu
                onLogoutClicked={onLogoutClicked}
                modal={modal}
                currentUser={props.currentUser}
            />
            <section className="main">
                {runningNap ? <RunningNapWidget napsController={nc} runningNap={runningNap} /> : null}
                <LastNapsWidget napsController={nc} />
                <article className="card">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Suscipit, esse? Harum, asperiores.
                    </p>
                </article>
                <article className="card">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ea expedita animi perferendis dicta architecto!
                    </p>
                </article>
            </section>
            <footer className="footer">This is the footer</footer>
            <Modal modal={modal}>
                {modalContent}
            </Modal>
        </div>
    );
}

export default Dashboard;