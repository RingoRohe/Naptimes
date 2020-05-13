import React from 'react';
import { Link } from 'react-router-dom';

const LoggedOutProfileMenu = (props) => {
    return (
        <section className="profileMenu menuPoint">
            <span className="icon fas fa-user-circle fa-4x"></span>
            <nav className="profileSubmenu">
                <Link to="/login">login</Link>
            </nav>
        </section>
    );
}

export default LoggedOutProfileMenu
