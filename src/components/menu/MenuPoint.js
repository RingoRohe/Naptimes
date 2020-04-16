import React from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from "react-router-dom";

const MenuPoint = props => {
    let location = useLocation();

    const getClasses = () => {
        if (props.to === location.pathname) {
            return 'menuPoint active';
        } else {
            return 'menuPoint';
        }
    }

    return (
        <Link className={getClasses()} to={props.to}>
            <span className={props.iconClasses}></span>
            <span className="text">{props.title}</span>
        </Link>
    );
}

MenuPoint.propTypes = {
    to: PropTypes.string,
    iconClasses: PropTypes.string,
    title: PropTypes.string
}

export default MenuPoint
