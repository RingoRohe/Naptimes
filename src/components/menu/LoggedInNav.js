// React
import React from 'react'
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

const LoggedInNav = (props) => {
    return (
        <ul className="main_menu">
            <li>
                <Link className="menuPoint" to="/naps">
                    <span className="icon fas fa-bed fa-3x"></span>
                    <span className="text">Naps</span>
                </Link>
            </li>
            <li>
                <Link className="menuPoint" to="/diapers">
                    <span className="icon fas fa-baby fa-3x"></span>
                    <span className="text">Diapers</span>
                </Link>
            </li>
            {/* <li>
                <Link className="menuPoint" to="/photos">
                    <span className="icon fas fa-camera-retro fa-3x"></span>
                    <span className="text">Photos</span>
                </Link>
            </li>
            <li>
                <Link className="menuPoint" to="/settings">
                    <span className="icon fas fa-sliders-h fa-3x"></span>
                    <span className="text">Settings</span>
                </Link>
            </li> */}
        </ul>
    );
}

LoggedInNav.propTypes = {
    settings: PropTypes.any
}

export default LoggedInNav;
