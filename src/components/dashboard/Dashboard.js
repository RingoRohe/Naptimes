import React from 'react';

import ProfileMenu from 'components/profile/ProfileMenu';
// import Users from 'components/dashboard/Users';
import NapsController from 'components/naps/NapsController';

const Dashboard = (props) => {

    const onLogoutClicked = () => {
        props.firebase.auth().signOut();
    };

    const napsButtonOnClick = (e) => {
        const nc = new NapsController();
        nc.createNewNap(props.user);
    }
    
    return (
        <div className="wrapper">
            <header>
                <h1>Naps - track your little buddy! <span role="img" aria-label="baby">👶🏻</span></h1>
            </header>
            <nav className="card">
                <ul className="mainMenu">
                    <li>
                        <button onClick={napsButtonOnClick}>Naps</button>
                    </li>
                    <li>
                        <button>Diapers</button>
                    </li>
                    <li>
                        <button>Pictures</button>
                    </li>
                </ul>
                <ul className="settings_menu">
                    <li>
                        <button>Settings</button>
                    </li>
                </ul>
            </nav>
            <ProfileMenu onLogoutClicked={onLogoutClicked} user={props.user} />
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