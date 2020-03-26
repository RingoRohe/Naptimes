import React from 'react';

const MainMenu = (props) => {
    return (
        <ul className="mainMenu">
            <li onClick={props.napsButtonOnClick} className="menuPoint">
                <span className="icon fas fa-bed fa-3x"></span>
                <span className="text">Naps</span>
            </li>
            <li className="menuPoint">
                <span className="icon fas fa-baby fa-3x"></span>
                <span className="text">Diapers</span>
            </li>
            <li className="menuPoint">
                <span className="icon fas fa-camera-retro fa-3x"></span>
                <span className="text">Photos</span>
            </li>
        </ul>
    );
}

export default MainMenu;