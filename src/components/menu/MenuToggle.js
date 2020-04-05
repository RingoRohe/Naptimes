import React from 'react'

const MenuToggle = () => {
    return (
        <ul className="menu_toggle">
            <input type="checkbox" name="toggle" id="toggle"/>
            <li>
                <label className="menuPoint" htmlFor="toggle">
                    <span className="icon fas fa-bars fa-3x"></span>
                    <span className="text">Menu</span>
                </label>
            </li>
        </ul>
    );
}

export default MenuToggle
