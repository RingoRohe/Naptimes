import React from 'react';

const ProfileMenu = (props) => {
    console.log(props.user);

    return (
        <div className="profile_menu">
            {(props.user && props.user.displayName) ? <span>Hello {props.user.displayName}</span>:<span>Hello</span>}
            <button onClick={props.onLogoutClicked}>logout</button>
        </div>
    );
}

export default ProfileMenu;