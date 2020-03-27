import React from 'react';
import NapsView from 'components/naps/NapsView';

const MainMenu = (props) => {
    const showNapsMenu = () => {
        props.modal.setContent(<NapsView napsController={props.napsController} modal={props.modal} />);
        props.modal.show();
    }
    
    return (
        <ul className="mainMenu">
            <li onClick={showNapsMenu} className="menuPoint">
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
            <li className="menuPoint">
                <span className="icon fas fa-sliders-h fa-3x"></span>
                <span className="text">Settings</span>
            </li>
        </ul>
    );
}

export default MainMenu;