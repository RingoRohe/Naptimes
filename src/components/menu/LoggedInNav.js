// React
import React from 'react'
import PropTypes from "prop-types";
import MenuPoint from './MenuPoint';

const LoggedInNav = (props) => {
    return (
        <ul className="main_menu">
            <li>
                <MenuPoint
                    to="/"
                    iconClasses="icon fas fa-columns fa-3x"
                    title="Dashboard"
                />
            </li>
            <li>
                <MenuPoint
                    to="/naps"
                    iconClasses="icon fas fa-bed fa-3x"
                    title="Naps"
                />
            </li>
            {/* <li>
                <MenuPoint
                    to="/diapers"
                    iconClasses="icon fas fa-baby fa-3x"
                    title="Diapers"
                />
            </li>
            <li>
                <MenuPoint
                    to="/photos"
                    iconClasses="icon fas fa-camera-retro fa-3x"
                    title="Photos"
                />
            </li>
            <li>
                <MenuPoint
                    to="/settings"
                    iconClasses="icon fas fa-sliders-h fa-3x"
                    title="Settings"
                />
            </li> */}
        </ul>
    );
}

LoggedInNav.propTypes = {
    settings: PropTypes.any
}

export default LoggedInNav;
