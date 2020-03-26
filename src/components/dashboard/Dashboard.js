import React from 'react';

import ProfileMenu from 'components/profile/ProfileMenuView';
// import Users from 'components/dashboard/Users';
import NapsController from 'components/naps/NapsController';
import MainMenu from 'components/menu/MainMenu';
import SettingsMenu from 'components/menu/SettingsMenu';

const Dashboard = (props) => {

    const onLogoutClicked = () => {
        props.firebase.auth().signOut();
    };

    const napsButtonOnClick = (e) => {
        e.preventDefault();
        const nc = new NapsController();
        nc.createNewNap(props.currentUser);
    }
    
    return (
        <div className="wrapper">
            <header>
                <h1>Naps - track your little buddy! <span role="img" aria-label="baby">👶🏻</span></h1>
            </header>
            <nav className="mainMenu card">
                <MainMenu napsButtonOnClick={napsButtonOnClick} />
                <SettingsMenu />
            </nav>
            <ProfileMenu onLogoutClicked={onLogoutClicked} currentUser={props.currentUser} />
            <aside className="card">
                <p>bla</p>
            </aside>
            <section className="main">
                {/* <Users firebase={props.firebase} /> */}
                <article className="card">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea expedita animi perferendis dicta architecto!
                    </p>
                </article>
                <article className="card">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea expedita animi perferendis dicta architecto!
                    </p>
                </article>
                <article className="card">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, esse? Harum, asperiores.
                    </p>
                </article>
                <article className="card">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea expedita animi perferendis dicta architecto!
                    </p>
                </article>
            </section>
            <footer className="card">This is the footer</footer>
        </div>
    );
}

export default Dashboard;