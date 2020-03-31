import React from 'react';
import { Link } from 'react-router-dom';

const LoggedOutNav = () => {
    return (
        <ul className="mainMenu">
            <li>
                <Link className="menuPoint" to="/info">
                    <span className="icon fas fa-info fa-3x"></span>
                    <span className="text">Info</span>
                </Link>
            </li>
        </ul>
    );
}

export default LoggedOutNav;
