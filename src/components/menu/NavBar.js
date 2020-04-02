// React
import React from 'react';
import PropTypes from "prop-types";

// Components
import LoggedInNav from './LoggedInNav';
import LoggedOutNav from './LoggedOutNav';

// Styles
import './menu.scss';

const NavBar = (props) => {

    return (
        props.currentUser ? <LoggedInNav /> : <LoggedOutNav />
    );
}

NavBar.propTypes = {
    currentUser: PropTypes.object
};

export default NavBar;