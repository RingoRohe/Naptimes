import React from 'react';
import LoggedInNav from './LoggedInNav';
import LoggedOutNav from './LoggedOutNav';

const NavBar = (props) => {

    return (
        props.currentUser ? <LoggedInNav /> : <LoggedOutNav />
    );
}

export default NavBar;