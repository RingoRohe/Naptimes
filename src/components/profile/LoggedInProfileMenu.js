import React from 'react'

function LoggedInProfileMenu(props) {
    const onLogoutClicked = () => {
        props.firebase.auth().signOut();
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
