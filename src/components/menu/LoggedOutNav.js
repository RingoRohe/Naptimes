import React from 'react';
import MenuPoint from "./MenuPoint";

const LoggedOutNav = () => {
    return (
        <ul className="main_menu">
            <li>
                <MenuPoint
                    to="/onboarding"
                    iconClasses="icon fas fa-info fa-3x"
                    title="Info"
                />
            </li>
        </ul>
    );
}

export default LoggedOutNav;
