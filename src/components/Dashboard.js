import React, { useState, useEffect } from 'react';

import ProfileMenu from 'components/profile/ProfileMenu';
import Users from 'components/Users';

const Dashboard = (props) => {
    // still for demo
    let [users, setUsers] = useState([]);

    useEffect(() => {
        // get data from firestore
        const unmountFirestore = props.firebase
            .firestore()
            .collection("users")
            .onSnapshot(querySnapshot => {
                let newUsers = [];
                querySnapshot.forEach(doc => {
                    newUsers.push({
                        id: doc.id,
                        name: doc.data().name,
                        email: doc.data().email
                    });
                });
                setUsers(newUsers);
            });
        
        return () => {
            // component will unmount
            unmountFirestore();
        };
    }, [props]);

    const onLogoutClicked = () => {
        props.firebase.auth().signOut();
    };
    
    return (
        <div className="wrapper">
            <header>
                <nav className="card">
                    <ul className="mainMenu">
                        <li>
                            <button>Naps</button>
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
                <div className="profile card">
                    <ProfileMenu onLogoutClicked={onLogoutClicked} user={props.user} />
                </div>
            </header>
            <section className="main">
                <aside className="card">
                    <p>bla</p>
                </aside>
                <article className="card">
                    <Users users={users} />
                </article>
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