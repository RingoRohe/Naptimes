import React, { useState, useEffect } from 'react';
import Loader from "libs/loading_overlay/js/loader";

import ProfileMenu from 'components/profile/ProfileMenu';
import Users from 'components/dashboard/Users';
import NapsController from 'components/naps/NapsController';

const Dashboard = (props) => {
    // still for demo
    let [users, setUsers] = useState([]);

    useEffect(() => {
        // get data from firestore
        let ldr = new Loader();
        ldr.show({
            elements: document.querySelector("#usersList")
        });

        const unmountUsersStore = props.firebase
            .firestore()
            .collection("users")
            .onSnapshot(querySnapshot => {
                let newUsers = [];
                querySnapshot.forEach(doc => {
                    newUsers.push({
                        id: doc.id,
                        displayName: doc.data().displayName,
                        email: doc.data().email
                    });
                });
                setUsers(newUsers);
                ldr.hide();
            });
        
        return () => {
            // component will unmount
            unmountUsersStore();
        };
    }, [props]);

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
            </header>
            <section className="main">
                <aside className="card">
                    <p>bla</p>
                </aside>
                <Users users={users} />
                <article className="card">
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Architecto et quisquam quod dolorem quam voluptate
                        debitis incidunt unde, recusandae labore sapiente
                        repudiandae voluptas natus amet necessitatibus quas
                        aperiam explicabo dicta nihil distinctio at quibusdam
                        deserunt? Sit vel laboriosam temporibus earum?
                    </p>
                </article>
            </section>
            <footer className="card">This is the footer</footer>
        </div>
    );
}

export default Dashboard;