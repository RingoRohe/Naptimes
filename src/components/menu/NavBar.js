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
        <nav>
            <input type="checkbox" name="toggle" id="toggle" />
            <ul className="menu_toggle">
                <li>
                    <label className="menuPoint" htmlFor="toggle">
                        <span className="icon fas fa-bars fa-3x"></span>
                        <span className="text">Menu</span>
                    </label>
                </li>
            </ul>
            {props.currentUser ? <LoggedInNav /> : <LoggedOutNav />}
        </nav>
    );
}

NavBar.propTypes = {
    currentUser: PropTypes.object
};

export default NavBar;