import React from 'react';

const ProfileMenu = (props) => {
    const setModalContent = () => {
        props.modal.setContent(
            <div onClick={() => { alert('haha!'); }}>
                <h1>Test</h1>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Officia, sint.
                </p>
            </div>
        );
    }

    return (
        <section className="profileMenu menuPoint card">
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
                <button onClick={props.modal.toggleVisibility}>show/hide modal</button>
                <button onClick={setModalContent}>show something</button>
                <button onClick={props.onLogoutClicked}>logout</button>
            </nav>
        </section>
    );
}

export default ProfileMenu;