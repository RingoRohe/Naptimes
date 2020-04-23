import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from "react-router-dom";

const MenuPoint = props => {

    return (
        <NavLink exact className="menuPoint" to={props.to}>
            <span className={props.iconClasses}></span>
            <span className="text">{props.title}</span>
        </NavLink>
    );
}

MenuPoint.propTypes = {
    to: PropTypes.string,
    iconClasses: PropTypes.string,
    title: PropTypes.string
}

export default MenuPoint
