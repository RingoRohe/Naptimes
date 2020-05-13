import React from 'react'
import PropTypes from 'prop-types'

import './startnapbutton.scss';

const StartNapButton = props => {
    const onStartNapButtonClick = e => {
        e.preventDefault();
        props.napsFunctions.startNap();
    };

    return (
        <article className="card startstop">
            <button onClick={onStartNapButtonClick}>START NAP</button>
        </article>
    );
}

StartNapButton.propTypes = {
    napsFunctions: PropTypes.object
};

export default StartNapButton
