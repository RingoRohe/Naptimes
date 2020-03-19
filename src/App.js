import React, { useState, useEffect } from 'react';
import firebase from './firebase/firebase';
import 'App.scss';

import Users from 'components/Users';
import Login from 'components/login/Login';
import ProfileMenu from 'components/profile/ProfileMenu';

function App() {
    let [user, setUser] = useState(null);
    let [users, setUsers] = useState([]);

    const onLogoutClicked = () => {
        firebase.auth().signOut();
    }

    const onLoginClicked = () => {
        document.querySelector('.login_overlay').classList.remove('hidden');
    }

    useEffect(() => {
        // component did mount

        // Authentication
        const unmountAuth = firebase.auth().onAuthStateChanged(function(authUser) {
            if (authUser) {
                // User is signed in.
                console.log(authUser);
                setUser(authUser);
            } else {
                setUser(null);
            }
            document.querySelector(".login_overlay").classList.add("hidden");
        });

        // get data from firestore
        const unmountFirestore = firebase
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
            unmountAuth();
        };
    }, []);

    // if (user) {
    //     return (
    //         <div className="App">
    //             <Dashboard onLogoutClicked={onLogoutClicked} />
    //         </div>
    //     );
    // } else {
    //     return (
    //         <div className="App">
    //             <Login />
    //         </div>
    //     );
    // }

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
                    {user ? (
                        <ProfileMenu onLogoutClicked={onLogoutClicked} user={user} />
                    ) : (
                        <button onClick={onLoginClicked}>login</button>
                    )}
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
            <div className="login_overlay overlay hidden card">
                <Login firebase={firebase} />
            </div>
        </div>
    );

}

export default App;
