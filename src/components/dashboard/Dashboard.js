import React from 'react';

import ProfileMenu from 'components/profile/ProfileMenuView';
// import Users from 'components/dashboard/Users';
import NapsController from 'components/naps/NapsController';
import MainMenu from 'components/menu/MainMenu';
import Modal from 'components/modal/Modal';
import { useState } from 'react';

const Dashboard = (props) => {
    // Modal
    let [modalContent, setModalContent] = useState(<p>default Content</p>);
    let [modalVisibility, setModalVisibility] = useState(false);
    const modal = {
        setContent: (content) => setModalContent(content),
        setVisibility: (visibility) => setModalVisibility(visibility),
        toggleVisibility: () => setModalVisibility(!modalVisibility),
        modalVisibility,
        modalContent
    };

    // Naps
    const napsController = new NapsController();

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
                <MainMenu napsController={napsController} modal={modal} />
            </nav>
            <ProfileMenu
                onLogoutClicked={onLogoutClicked}
                modal={modal}
                currentUser={props.currentUser}
            />
            <section className="main">
                {/* <Users firebase={props.firebase} /> */}
                <article className="card">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ea expedita animi perferendis dicta architecto!
                    </p>
                </article>
                <article className="card">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ea expedita animi perferendis dicta architecto!
                    </p>
                </article>
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