import React from 'react'
import PropTypes from 'prop-types'

import './startnapbutton.scss';

const StartNapButton = props => {
    const onStartNapButtonClick = e => {
        e.preventDefault();
        props.napsFunctions.startNap();
    };

    return (
        <div className="card startstop">
            <button onClick={onStartNapButtonClick}>START NAP</button>
        </div>
    );
}

StartNapButton.propTypes = {
    napsFunctions: PropTypes.object
};

export default StartNapButton
