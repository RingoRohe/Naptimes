// React
import React from 'react'
import { useHistory } from "react-router-dom";

function LoggedInProfileMenu(props) {
    let history = useHistory();

    const onLogoutClicked = () => {
        props.firebase.auth().signOut();
        history.push("/");
    };

    return (
        <section className="profileMenu menuPoint">
            {props.currentUser && props.currentUser.photoURL ? (
                <img
                    className="picture"
                    src={props.currentUser.photoURL}
                    alt="Profile"
                />
            ) : (
                <span className="icon fas fa-user-circle fa-4x"></span>
            )}
            <span className="text username">
                {props.currentUser.displayName}
            </span>
            <nav className="profileSubmenu">
                <button onClick={onLogoutClicked}>logout</button>
            </nav>
        </section>
    );
}

export default LoggedInProfileMenu
