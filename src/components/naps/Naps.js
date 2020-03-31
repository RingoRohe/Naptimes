import React from 'react'
import PropTypes from 'prop-types'

const Naps = props => {
    const onStartNapButtonClick = e => {
        e.preventDefault();
        props.naps.startNap();
    };

    const onFinishNapButtonClick = e => {
        e.preventDefault();
        props.naps.finishNap();
    };

    return props.naps.isNapRunning() ? (
        <form>
            <fieldset>
                <legend>Nap</legend>
                <button onClick={onFinishNapButtonClick}>NAP FINISHED</button>
            </fieldset>
        </form>
    ) : (
        <form>
            <fieldset>
                <legend>start Nap</legend>
                <button onClick={onStartNapButtonClick}>START NAP</button>
            </fieldset>
        </form>
    );
}

Naps.propTypes = {
    naps: PropTypes.object
}

export default Naps
