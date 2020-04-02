// React
import React from 'react';

// Components
import LoggedInProfileMenu from './LoggedInProfileMenu';
import LoggedOutProfileMenu from './LoggedOutProfileMenu';

// Styles
import './profileMenu.scss';

const ProfileMenu = (props) => {
    return props.currentUser
        ? <LoggedInProfileMenu firebase={props.firebase} currentUser={props.currentUser} />
        : <LoggedOutProfileMenu firebase={props.firebase} modal={props.modal} />;
}

export default ProfileMenu;